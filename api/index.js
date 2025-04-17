import express from 'express'
import { CreateCapacityProviderCommand, ecsClient } from '@aws-sdk/client-ecs';

const app=express();
const PORT=9000;

const ecs=new ecsClient({
    credentials:{
        accessKeyId:'',
        secretAccessKey:''
    }

}) 

app.listen(PORT,()=>{
    console.log(`Api server is running on ${PORT}`)
})

