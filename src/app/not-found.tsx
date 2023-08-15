import Button from "@/components/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="w-screen h-screen bg-[url(/gradient-light.png)] min-h-screen dark:lg:bg-[url(/gradient-dark.png)]"
      style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
    >
      <div className="flex overflow-y-hidden absolute inset-0 flex-col gap-4 justify-center items-center px-6 text-black shadow sm:p-12 lg:m-8 lg:rounded-xl dark:text-white bg-white/90 backdrop-blur-lg dark:bg-black/90">
        <h1 className="col-span-2 text-4xl font-bold text-center">
          404 - Page Not Found
        </h1>
        <p>
          Looks like you&apos;ve followed a broken link or entered a URL that
          doesn&apos;t exist on this site.
        </p>
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </section>
  );
}
