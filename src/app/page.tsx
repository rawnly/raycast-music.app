import { getExtension } from "@/lib/raycast";
import RaycastWindow from "./components/raycast-window/window";
import Hero from "@/components/Hero";

export default async function Page() {
  const extension = await getExtension("fedevitaledev", "music");

  if (!extension) {
    throw new Error("something went wrong");
  }

  return (
    <>
      <section
        className="w-screen h-screen bg-black lg:bg-[url(/gradient.svg)] min-h-screen dark:lg:bg-[url(/gradient-dark-2.svg)]"
        style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      >
        <div className="grid overflow-y-hidden absolute inset-0 grid-cols-2 gap-x-8 px-6 text-black bg-white rounded-xl shadow sm:p-12 lg:m-8 dark:text-white dark:bg-black">
          <div className="flex flex-col col-span-2 gap-8 justify-center items-center lg:col-span-1 lg:items-end md:mt-[40%] lg:mt-0">
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
