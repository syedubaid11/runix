const { exec } =require("child_process")
const { path } = require("path" )
import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3'


async function init(){
    console.log('Genrating...')
    const repoPath=path.join(__dirname,'output')

    const executePath=exec(`cd ${repoPath} && npm install && npm run build`)
    executePath.stdout.on("data",()=>{console.log(data.toString())})
    executePath.stdout.on("error",()=>{console.log('Error while building :',error.toString())})
}

init();