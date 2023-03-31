import { getExtension } from "@/lib/raycast";
import RaycastMenu from "./RaycastMenu";
import Hero from "@/components/Hero";
import { motion } from "framer-motion";
import MagicNumber from "@/components/MagicNumber";
import MenuFooter from "./MenuFooter";

export default async function Page() {
  const extension = await getExtension("fedevitaledev", "music");

  if (!extension) {
    throw new Error("something went wrong");
  }

  return (
    <>
      <section
        className="w-screen h-screen bg-black lg:bg-[url(/bg-light.png)] min-h-screen dark:lg:bg-[url(/bg-dark.png)]"
        style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      >
        <div className="grid absolute inset-0 grid-cols-2 gap-x-8 p-12 text-black bg-white rounded-xl shadow lg:m-8 dark:text-white dark:bg-black">
          <div className="flex flex-col col-span-2 gap-8 justify-center items-center lg:col-span-1 lg:items-end">
            <Hero />
            <div className="flex justify-center items-center w-full lg:hidden">
              <RaycastMenu extension={extension} />
            </div>
          </div>
          <div className="hidden relative col-span-1 justify-center items-center pl-8 lg:flex">
            <div className="my-auto w-full">
              <RaycastMenu extension={extension} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
