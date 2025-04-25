export const Sidebar=()=>{
    return(
        <div className="hidden md:block ml-[20px] w-max gap-[30px] h-screen bg-transparent md:flex flex-col justify-center tracking-tighter text-[20px]">
            <div> <a href="#about" className="hover:cursor-pointer hover:text-gray-500 transition-colors duration-500"> what is runix? </a></div>
            <div> <a href="#systemd" className="hover:cursor-pointer  hover:text-gray-500 transition-colors duration-500"> architecture</a></div>
            <div> <a href="" className="hover:cursor-pointer  hover:text-gray-500 transition-colors duration-500"> contribute</a></div>
        </div>
    )
}