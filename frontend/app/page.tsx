import Image from "next/image";
import { HomeSection } from "./pages/home/page";
import { Sidebar } from "./components/sidebar";
import { About } from "./components/about";
import { SystemD } from "./components/systemd";

export default function Home() {


  return (
    <div className="bg-grid-pattern w-full h-full">
    <div className="absolute">
      <Sidebar/>
    </div>
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="border-1 border-gray-200 shadow-2xl bg-gradient-to-br from-transparent via-white to-transparent w-[320px] md:w-[1000px] md:h-[600px] rounded-2xl flex items-center justify-center ">
      <HomeSection/>
      </div>
    </div>

    <div id="about" className="">
      <About/>
    </div>
    <div id="systemd">
      <SystemD/>
    </div>

    </div>

  );
}
