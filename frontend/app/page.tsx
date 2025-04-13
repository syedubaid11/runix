import Image from "next/image";
import { HomeSection } from "./pages/home/page";

export default function Home() {
  return (
    <div className="bg-grid-pattern w-screen h-screen flex items-center justify-center">
      <div className="border-1 border-gray-200 shadow-2xl bg-gradient-to-br from-transparent via-white to-white w-[800px] h-[450px] rounded-2xl flex items-center justify-center">
      <HomeSection/>
      </div>
    </div>
  );
}
