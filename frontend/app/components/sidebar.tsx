export const Sidebar=()=>{
    return(
        <div className="ml-[20px] w-max gap-[30px] h-screen bg-transparent flex flex-col justify-center tracking-tighter">
            <div> <a href="#about" className="hover:cursor-pointer"> what is runix? </a></div>
            <div> <a href="#features" className="hover:cursor-pointer"> features </a></div>
            <div> <a href="#architecture" className="hover:cursor-pointer"> architecture</a></div>
            <div> <a href="" className="hover:cursor-pointer"> contribute</a></div>
        </div>
    )
}