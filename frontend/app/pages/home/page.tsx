"use client"
import { Toaster , toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from 'axios';
import { io } from 'socket.io-client';
import '../../globals.css'

export const HomeSection=()=>{
    const [logs,setLogs]=useState(['']);
    const [loading,setLoading]=useState(false);
    const [input,setInput]=useState('');

    const ProjectId='T912'

    useEffect(()=>{
        try {
            const socket=io('http://localhost:9002');
            console.log(socket);
            socket.on('log', ({ channel, message }) => {               
                setLogs((prevLogs)=>[...prevLogs,`${message}`])
                console.log(`[${channel}]: ${message}`);
                if(message==="Deployment Complete"){
                    setLoading(false);
                    toast.success('Deployment Complete!')
                }
              });  
        } catch (error) {
            console.log('error while connecting to socket',error);
        }
    },[ProjectId])

    
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
            setLoading(true);
            const repolink=input.trim();
            try {
                console.log(input.trim())
                const response=await axios.post('http://localhost:9000/project',{
                    git_url: repolink,
                    project_id:ProjectId
                })
                toast.success('Searching...')
                console.log(response);
                
            } catch (error) {
                setLoading(false);
                console.log('Request Failed',error);
                
            }
        
        setInput('');
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
            <span className="tracking-tighter text-[100px] font-bold">runix</span><span className="text-[30px]">   deploy in seconds</span>
            <div className="flex flex-row items-center justify-center mt-[20px]">
                  <form onSubmit={handleSubmit} className="flex items-center text-2xl  duration-300" >
                    <input className="p-[3px] rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Enter the Repository Url..."/>
                    {loading ? <button className="loading-spinner">.</button> : <button className="ml-[8px] border border-gray-200 text-2xl p-[5px] rounded-md hover:cursor-pointer hover:bg-gray-100 transition-all duration-300" type="submit">
                        Submit
                    </button>}
                    
                   </form>
            </div>
            
            <Toaster position="bottom-center"/>

        </div>
        <div className="w-[550px] h-[200px] mt-[20px] overflow-y-auto">
            {map}
        </div>
        </div>
    )

}
