import express from 'express'
import { ECSClient, RunTaskCommand} from '@aws-sdk/client-ecs';
import 'dotenv/config'
import { z } from 'zod';

const app=express();
const PORT=9000;
app.use(express.json());

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
  const result=await uploadSchema.safeParse(req.body);

  if(result){
    const {git_url,project_id}=req.body;
    console.log(git_url)

    const command=new RunTaskCommand({
      launchType:"FARGATE",
      cluster:"runix-cluster",
      taskDefinition:'arn:aws:ecs:ap-south-1:977099018494:task-definition/runix-v2:4',
      overrides:{
        containerOverrides:[
        ],
        environment:[
                {name:'GIT_REPOSITORY_URL',value: git_url},
                {name:'PROJECT_ID',value: project_id }
        ]
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

  }
  else{
    res.json({message:"Error while parsing"})
  }
})

app.listen(PORT,()=>{
    console.log(`Api server is running on ${PORT}`)
})

