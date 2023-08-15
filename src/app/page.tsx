import { getExtension } from "@/lib/raycast";
import RaycastWindow from "./components/raycast-window/window";
import Hero from "@/components/Hero";

export default async function Page() {
  const extension = await getExtension("fedevitaledev", "music");

  if (!extension) {
    throw new Error("Could not fetch extension data");
  }

  return (
    <>
      <section
        className="w-screen h-screen bg-[url(/gradient-light.png)] min-h-screen dark:lg:bg-[url(/gradient-dark.png)]"
        style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      >
        <div className="grid overflow-y-hidden absolute inset-0 grid-cols-2 gap-x-8 px-6 text-black shadow sm:p-12 lg:m-8 lg:rounded-xl dark:text-white bg-white/90 backdrop-blur-lg dark:bg-black/90">
          <div className="flex flex-col col-span-2 gap-8 justify-center items-center lg:col-span-1 lg:items-end md:mt-[35%] lg:mt-0">
            <Hero />
            <div className="flex justify-center items-center w-full lg:hidden">
              <RaycastWindow extension={extension} />
            </div>
          </div>
          <div className="hidden relative col-span-1 justify-center items-center pl-8 lg:flex">
            <div className="my-auto w-full">
              <RaycastWindow extension={extension} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
