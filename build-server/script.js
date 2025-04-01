import { exec } from 'child_process'
import path from 'path'
import {S3Client , PutObjectCommand } from '@aws-sdk/client-s3'
import fs from "fs"
import dotenv from "dotenv"
import mime from 'mime-types'
import { fileURLToPath } from 'url'

//dirname
const __filename=fileURLToPath (import.meta.url)
const __dirname=path.dirname(__filename)

dotenv.config();

const S3=new S3Client({
    region:'ap-south-1',
    credentials:{
        accessKeyId:process.env.accessKeyId,
        secretAccessKeyId:process.env.secretAccessKeyId,
    }

})

const projectId=process.env.PROJECT_ID;

async function init(){
    console.log('Genrating...')
    const repoPath=path.join(__dirname,'output')

    const executePath=exec(`cd ${repoPath} && npm install && npm run build`) //start the build 

    executePath.stdout.on('data',(data)=>{console.log(data.toString())})

    executePath.stdout.on("error",()=>{console.log('Error while building :',error.toString())})

    executePath.on("close",async()=>{
        console.log('Build Complete!')
        const distFolderPath=path.join(__dirname,'output','dist')
        const distFolderContents=fs.readdirSync(distFolderPath,{recursive:true}) //getting all the build folder contents and set recursive:true to get all the content within subfolders.

        for(const filePath of distFolderContents){
            if(fs.lstatsync(filePath).isDirectory())continue;

            console.log(`Uploading ${filePath} ....`)

            const command=new PutObjectCommand({
                Bucket:'runix-bucket',
                Key:'__outputs/${[PROJECT_ID]/${filePath}}',
                Body:fs.read,
                ContentType:mime.lookup(filePath),       //using mime lookup to get the contentType to store in bucket
            })
            try {
               const sendCommand=await S3.send(command)
               console.log('Uploaded!!')
            } catch (error) {
                console.log('There was an error :',error)
            } 
        }
    })

    

}

init();