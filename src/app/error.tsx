"use client";

import Button from "@/components/button";

interface Props {
  error: Error & { digest?: string };
  reset(): void;
}

export default function ErrorPage(props: Props) {
  return (
    <section
      className="w-screen h-screen bg-[url(/gradient-light.png)] min-h-screen dark:lg:bg-[url(/gradient-dark.png)]"
      style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
    >
      <div className="flex overflow-y-hidden absolute inset-0 flex-col gap-4 justify-center items-center px-6 text-black shadow sm:p-12 lg:m-8 lg:rounded-xl dark:text-white bg-white/90 backdrop-blur-lg dark:bg-black/90">
        <h1 className="col-span-2 text-4xl font-bold text-center">
          Whoops! Something went wrong.
        </h1>
        <pre>{props.error.message}</pre>
        <Button onClick={props.reset}>Try again</Button>
      </div>
    </section>
  );
}
