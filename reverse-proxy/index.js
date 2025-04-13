const express=require('express')
const httpProxy=require('http-proxy')

const app=express();
const PORT=8000;

const BASE_PATH="https://runix-bucket.s3.ap-south-1.amazonaws.com/__outputs/"

const proxy=httpProxy.createProxysys()

app.listen(PORT,()=>{
    console.log('Reverse Proxy listening on PORT:',PORT)
})

app.use((req,res)=>{
    const hostname=req.hostname;
    const subdomain=hostname.split('.')[0];

    const resolvesTo=`${BASE_PATH}/${subdomain}`

    proxy.web(req,res,{target:resolvesTo,changeOrigin:true})



})