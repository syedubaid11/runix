import express from 'express'
import { ECSClient, RunTaskCommand} from '@aws-sdk/client-ecs';
import { createServer } from 'node:http';
import 'dotenv/config'
import { z } from 'zod';
import cors from 'cors';
import { Server } from 'socket.io';
import { Redis } from 'ioredis';

const app=express();
const PORT=9000;

app.use(express.json());
app.use(cors({
  origin:'http://localhost:3000',
  methods:['POST','OPTIONS','GET'],
  credentials:true,
}))

app.options('*', cors()); //preflight requests

const subscriber=new Redis(process.env.upstash_redis);


const io=new Server({cors:'*'});    //allowing all origins to connect 
io.listen(PORT,()=>{
  console.log('Socket is running on 9000')
})

io.on('connection',(socket)=>{
  //subscribing to logs
  subscriber.psubscribe('logs:*',(err,count)=>{
    if(err){
      console.log('Redis subscription error',err);
    }
    else{
      console.log(`Subscribed to ${count} log channel`);
    }
    subscriber.on('pmessage',(pattern,channel,message)=>{
      console.log(`New log on channel ${channel}:${message}`);
      socket.emit('log',{channel,message});      //emitting logs
    })
  })
  console.log('A user has connected');
  socket.on('disconnect',()=>{
    console.log('User has disconnected')
  })
})



export const uploadSchema=z.object({
  git_url:z.string(),
  project_id:z.string()
})


const client=new ECSClient({
    credentials:{
        accessKeyId:process.env.accessKeyId,
        secretAccessKey:process.env.secretAccessKey
    }
}) 

app.post('/project',async (req,res)=>{
  const result=uploadSchema.safeParse(req.body);
  console.log(req.body);
  if(result){
    const {git_url,project_id}=req.body;

    const command=new RunTaskCommand({
      launchType:"FARGATE",
      cluster:"runix-cluster",
      taskDefinition:'arn:aws:ecs:ap-south-1:977099018494:task-definition/runix-v2:6',
      overrides:{
        containerOverrides:[
          {
            name:'runix-v2-image',
            environment:[
              {name:'GIT_REPOSITORY__URL',value: git_url},
              {name:'PROJECT_ID',value: project_id }
      ]
          }
        ],
        
      },
      networkConfiguration: { // NetworkConfiguration
        awsvpcConfiguration: { // AwsVpcConfiguration
          subnets: [ // StringList // required
            "subnet-09ad8698a74dc58c5",
            "subnet-04966e3417fc2b50e",
            "subnet-0befcebc3139a1062",
          ],
          securityGroups: [
            "sg-068303971d96858e5",
          ],
          assignPublicIp: "ENABLED" ,
        },
      },
    });
    const response=await client.send(command);

    // function redisLogs(){
    //   const logs=subscriber.subscribe(`logs:${project_id}`);
    //   console.log(logs);
    // }
    

  }
  else{
    res.json({message:"Error while parsing"})
  }
})

app.listen(PORT,()=>{
    console.log(`Api server is running on ${PORT}`)
})

