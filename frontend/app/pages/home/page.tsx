"use client"
import { Toaster , toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from 'axios';
import { io } from 'socket.io-client';
import '../../globals.css'
import { uuid } from "uuidv4";

export const HomeSection=()=>{
    const [logs,setLogs]=useState(['']);
    const [loading,setLoading]=useState(false);
    const [input,setInput]=useState('');
    const [deployment,setDeployment]=useState(false);
    const [ProjectId,setProjectId]=useState('')
    const [ws,setWs]=useState(false);


    useEffect(()=>{
        if(ws){
            try {
            
            const socket=io('http://13.232.228.186:9001',{
                reconnectionAttempts:3,
                timeout:5000,
                transports:["websocket"]
            });
            console.log(socket);
            socket.on('connection',()=>{
                console.log('Connected')
            })
            socket.on('log', ({ channel, message }) => {               
                setLogs((prevLogs)=>[...prevLogs,`${message}`])
                console.log(`[${channel}]: ${message}`);
                if(message==="Deployment Complete"){
                    setLoading(false);
                    setDeployment(true);
                    toast.success('Deployment Complete!');
                    

                }
              });  
        } catch (error) {
            console.log('error while connecting to socket',error);
        }
        }
        else{
            return;
        }
        
    },[ws])
     
    const handleDeployment=()=>{
        const link=`http://13.232.228.186:8000/p/${ProjectId}`
        window.location.href=link;
    }
    
    const isValidRepoUrl = (url:string) => {
        if(!input.trim()){
            toast.error('Empty field!');
        }
        const githubRegex = /^https:\/\/github\.com\/[^\/\s]+\/[^\/\s]+(\.git)?$/;
        return githubRegex.test(url);
      };
  
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(!isValidRepoUrl(input)){
            toast.error('Please enter a valid Repo Url');
        }
        else{
            setWs(true);
            setLoading(true);
            const repolink=input.trim();

            const pId=uuid();
            setProjectId(pId);
            
            try {
                console.log(ProjectId);
                const response=await axios.post('http://13.232.228.186:9000/project',{
                    git_url: repolink,
                    project_id:pId
                })
                toast.success('Searching...')
                console.log(response);
                
            } catch (error) {
                setLoading(false);
                console.log('Request Failed',error);
                
            }
        setInput('');

        }
            
    }
    const map=logs.map((item,index)=>{
        return(
            <div key={index} className="font-light">
                {item}
            </div>
        )
    })
    return(
        <div className="flex flex-col justify-center items-center">
        <div className="tracking-tight">
            <span className="tracking-tighter text-[55px] md:text-[100px] font-bold">runix</span><span className="fade text-[20px] md:text-[30px] font-mono tracking-tight">   deploy in seconds</span>
            <div className="flex flex-row items-center justify-center mt-[20px]">
                  <form onSubmit={handleSubmit} className="flex items-center md:text-2xl  duration-300" >
                    <input className="cursor-pointer p-[3px] rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Enter the Repository Url..."/>
                    {loading ?<button type="button" className="ml-[24px] font-mono text-[20px] flex flex-row items-center gap-[8px]"> <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" className="hds-flight-icon--animation-loading animate-spin h-[25px] w-[25px]"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"> <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"></path> <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"></path> </g> </g></svg> Processing</button> : <button className="font-mono ml-[8px] border border-gray-200 md:text-2xl p-[5px] rounded-md hover:cursor-pointer hover:bg-gray-100 transition-all duration-300" type="submit">
                        submit
                    </button>}
                   </form>
            </div>
            
            <Toaster position="bottom-center"/>

        </div>
        <div className="w-3/4 md:w-[550px] h-[200px] mt-[20px] overflow-y-auto bg-transparent font-mono text-gray-500">
            {map}
        </div>
         {deployment&&
         <div className="mt-[40px]">
            <button className="fade shadow-sm border border-gray-200 bg-transparent hover:bg-gray-50 p-[10px] rounded-md cursor-pointer transition-all duration-300" onClick={handleDeployment}>Deployed Project</button>
          </div>}
        </div>
    )

}
