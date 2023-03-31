import { getExtension } from "@/lib/raycast";
import RaycastMenu from "./RaycastMenu";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";

const formatNumber = (num: number) => {
  if (num < 1e3) return num.toString();
  if (num < 1e6) return (num / 1e3).toFixed(1) + "K";
  if (num < 1e9) return (num / 1e6).toFixed(1) + "M";

  return (num / 1e9).toFixed(1) + "B";
};

export default async function Page() {
  const extension = await getExtension("fedevitaledev", "music");

  if (!extension) {
    throw new Error("something went wrong");
  }

  return (
    <>
      <section
        className="w-screen h-screen bg-[url(/bg-light.png)] min-h-screen dark:bg-[url(/bg-dark.png)]"
        style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      >
        {/* <div className="absolute inset-x-0 bg-gradient-to-b to-white dark:to-black from-[transparent] -bottom-[10vh] h-[10vh]"></div> */}
        <div className="grid absolute inset-0 grid-cols-2 gap-x-8 p-12 m-8 text-black bg-white rounded-xl shadow dark:text-white dark:bg-black">
          <div className="flex col-span-2 justify-center items-center md:col-span-1 md:justify-end">
            <Hero />
          </div>
          <div className="hidden col-span-1 justify-start items-center pl-8 md:flex">
            <RaycastMenu extension={extension} />
          </div>
        </div>
      </section>
    </>
  );
}
