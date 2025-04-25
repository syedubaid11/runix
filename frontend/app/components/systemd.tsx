

export const SystemD=()=>{
    return(
        <div className="h-max w-max-screen p-[60px] px-[120px] mt-[50px]">
        <div className="font-bold text-2xl tracking-tight">architecture</div>
        <div className="tracking-tighter text-xl">runix is a scalable build and deployment system powered by Amazon ECS. It runs builds in isolated containers, ensuring reliability and parallel processing. Once a build completes, artifacts are uploaded to S3 for storage and distribution. Logs are captured in real time and cached for quick access via CloudWatch or S3. With an intelligent caching layer, Runix speeds up repeated builds by reusing unchanged outputs, making it efficient and production-ready.</div>
        <div className="w-full flex items-center justify-center p-[40px]">
            <img src="assets/image.png" alt='Diagram'/>
        </div>
    </div>

    )
}