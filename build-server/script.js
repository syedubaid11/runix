
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';
import Redis from 'ioredis';
import { fileURLToPath } from 'url';
import dotenv from "dotenv"

dotenv.config();
// const publisher = new Redis('')
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKeyId
    }
})

const PROJECT_ID = process.env.PROJECT_ID;

async function init() {
    console.log('Executing script.js')
    console.log('Build Started');
    const outDirPath = path.join(__dirname, 'output');
    
    //building the repo
    const p = exec(`cd ${outDirPath} && npm install && npm run build`);
 
    //share logs when data is streamed
    p.stdout.on('data', function (data) {
        console.log(data.toString())
        
    })

    p.stdout.on('error', function (data) {
        console.log('Error', data.toString())
      
    })

    p.on('close', async function () {
        console.log('Build Complete')
       
        const distFolderPath = path.join(__dirname, 'output', 'dist')
        const distFolderContents = fs.readdirSync(distFolderPath, { recursive: true })

        console.log('Starting upload')
        
        for (const file of distFolderContents) {
            const filePath = path.join(distFolderPath, file)
            if (fs.lstatSync(filePath).isDirectory()) continue;

            console.log('uploading', filePath)
            
            //uploading to s3 bucket
            const command = new PutObjectCommand({
                Bucket: 'runix-v2',
                Key: `__outputs/${PROJECT_ID}/${file}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            })

            await s3Client.send(command)
            
            console.log('uploaded', filePath)
        }
        // publishLog(`Done`)
        console.log('Done...')
    })
}

init()