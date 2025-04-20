import express from 'express'
import { ECSClient, RunTaskCommand} from '@aws-sdk/client-ecs';
import 'dotenv/config'

const app=express();
const PORT=9000;

const client=new ECSClient({
    credentials:{
        accessKeyId:process.env.accessKeyId,
        secretAccessKey:process.env.secretAccessKey
    }
}) 

const project_link="https://github.com/syedubaid11/test-project";

const input={
      launchType:"FARGATE",
      cluster:"runix-cluster",
      taskDefinition:'arn:aws:ecs:ap-south-1:977099018494:task-definition/runix-v2:2',
      overrides:{
        containerOverrides:[
        ],
        environment:[
            {
                name:'GIT_REPOSITORY_URL',
                value:project_link,
                name:'PROJECT_ID',
                value:'p3'
            }
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

}

app.post('/project',async(req,res)=>{
    // const gitUrl=req.body;
    console.log('req is here')
    // const projectSlug=slugify(req.body);
    const command=new RunTaskCommand(input)
    const response = await client.send(command);

})


app.listen(PORT,()=>{
    console.log(`Api server is running on ${PORT}`)
})

