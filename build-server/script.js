const { exec } =require("child_process")
const { path } = require("path" )


// do i need to do here?? 
// docker makes an isolated container 
// afer that main.sh script is triggerd
// we clone the github repo 
// all of this is done inside the container 
// now after cloning we will execute a js file and it will npm run build and npm run install
//done till this step 


// we will take the dist folder and upload it to s3 client?
// so what do i need ???
// when i first get inside this 
// i need to know the path of the repo 
// so we'll get to the path 
// after that we will build the repo and upload to s3
// so lets focus on getting the repo path .

async function init(){
    console.log('Genrating...')
    const repoPath=path.join(__dirname,'output')

    const executePath=exec(`cd ${repoPath} && npm install && npm run build`)
    executePath.stdout.on("data",()=>{console.log(data.toString())})
    executePath.stdout.on("error",()=>{console.log('Error while building :',error.toString())})
}

init();