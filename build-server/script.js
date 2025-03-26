const { exec } =require("child_process")
const { path } = require("path" )
import {S3Client , PutObjectCommand } from '@aws-sdk/client-s3'
import fs from "fs"
import dotenv from "dotenv"

dotenv.config();

const S3Client=new S3Client({
    region:'auto',
    credentials:{
        accessKeyId:process.env.accessKeyId,
        secretAccessKeyId:process.env.secretAccessKeyId,
    }

})

async function init(){
    console.log('Genrating...')
    const repoPath=path.join(__dirname,'output')

    const executePath=exec(`cd ${repoPath} && npm install && npm run build`) //start the build 

    executePath.stdout.on("data",()=>{console.log(data.toString())})

    executePath.stdout.on("error",()=>{console.log('Error while building :',error.toString())})

    executePath.on("close",()=>{
        console.log('Build Complete!')
        const distFolderPath=path.join(__dirname,'output','dist')
        const distFolderContents=fs.readdirSync(distFolderPath,{recursive:true}) //getting all the build folder contents and set recursive:true to get all the content within subfolders.
    })

    

}

init();