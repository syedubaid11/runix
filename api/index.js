import express from 'express'
import { CreateCapacityProviderCommand, ecsClient , RunTaskCommand } from '@aws-sdk/client-ecs';

const app=express();
const PORT=9000;

const ecs=new ecsClient({
    credentials:{
        accessKeyId:'',
        secretAccessKey:''
    }

}) 

app.post('/project',(req,res)=>{
    const gitUrl=req.body;
    const projectSlug=s
})

app.listen(PORT,()=>{
    console.log(`Api server is running on ${PORT}`)
})

