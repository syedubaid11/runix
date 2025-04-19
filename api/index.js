import express from 'express'
import slugify from 'slugify';
import { CreateCapacityProviderCommand, ECSClient, LaunchType, RunTaskCommand } from '@aws-sdk/client-ecs';

const app=express();
const PORT=9000;

const ecs=new ECSClient({
    credentials:{
        accessKeyId:'',
        secretAccessKey:''
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
            }
        ]
      }

}

app.post('/project',(req,res)=>{
    const gitUrl=req.body;
    console.log('req is here')
    // const projectSlug=slugify(req.body);
    try {
        const command=new RunTaskCommand(input)
    } catch (error) {
        console.log(error);
        
    }
    
})

const test="hehehehehe   fasdfds fdfsdfsdf"
const slug=slugify(test);
console.log(slug)

app.listen(PORT,()=>{
    console.log(`Api server is running on ${PORT}`)
})

