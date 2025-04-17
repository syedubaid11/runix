"use client"

import { useState } from "react";

export const HomeSection=()=>{
    const [input,setInput]=useState('');
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        console.log(e.target);
    }
    return(
        <div className="text-4xl font-[40px] tracking-tight">
            <span className="tracking-tighter text-6xl font-bold">runix</span> ,deploy in seconds
            <div className="flex flex-row items-center justify-center mt-[20px]">
                  <form onSubmit={handleSubmit} className="flex items-center text-2xl" ><input type="text" onChange={(e)=>{setInput(e.target.value)}} placeholder="Enter the Repository Url..."/><button className="ml-[8px] border border-gray-200 text-2xl p-[5px] rounded-md hover:cursor-pointer hover:bg-gray-100 transition-all duration-300" type="submit">Submit</button></form>
            </div>
        </div>
    )

}