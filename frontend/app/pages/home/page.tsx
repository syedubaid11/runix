"use client"
import { Toaster , toast } from "react-hot-toast";
import { useState } from "react";
import axios from 'axios';

export const HomeSection=()=>{
    const [input,setInput]=useState('');

    const handleRequest=()=>{
        
    }

    const handleSubmit=async(e:React.FormEvent)=>{
        if(!input.trim()){
            toast.error('Empty field!');
        }
        else{
            const repolink=input.trim();
            try {
                console.log(input.trim())
                const response=await axios.post('http://localhost:9000/project',{
                    git_url: repolink,
                    project_id:"test6"
                })
                console.log(response);
                
            } catch (error) {
                console.log('Request Failed',error);
                
            }
           
            toast.success('Searching...')
        }
        e.preventDefault();

        console.log(input)

        setInput('');
    }
    return(
        <div className="tracking-tight">
            <span className="tracking-tighter text-[100px] font-bold">runix</span><span className="text-[30px]">   deploy in seconds</span>
            <div className="flex flex-row items-center justify-center mt-[20px]">
                  <form onSubmit={handleSubmit} className="flex items-center text-2xl" ><input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Enter the Repository Url..."/><button className="ml-[8px] border border-gray-200 text-2xl p-[5px] rounded-md hover:cursor-pointer hover:bg-gray-100 transition-all duration-300" type="submit">Submit</button></form>
            </div>
            <Toaster position="bottom-center"/>
        </div>
    )

}