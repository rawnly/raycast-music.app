"use client";

import Balancer from "react-wrap-balancer";

import Button from "@/components/button";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import Link from "next/link";

declare global {
  class MusicKit {
    authorize(): Promise<string>;

    static getInstance(): MusicKit;
    static configure(params: {
      developerToken: string;
      app: {
        name: string;
        build: string;
      };
    }): void;
  }
}

async function fetcher<T>(url: string) {
  const res = await fetch(url);

  return res.json() as Promise<T>;
}

export default function Page() {
  const [token, setToken] = useState<string | null>(null);

  const { data, isLoading } = useSWR<{ token: string; expires: number }>(
    "/api/get-token",
    fetcher
  );

  const instance = useMemo(() => {
    if (typeof MusicKit === "undefined") return;
    return MusicKit.getInstance();
  }, []);

  useEffect(() => {
    if (!data || typeof MusicKit === 'undefined') return;

    if (typeof MusicKit.configure !== 'function') {
      console.warn('MusicKit.configure is not a function', MusicKit)
      alert('Something went wrong while initializing MusicKit. Please reload.')
      return
    }

    console.log('MusicKit has been initialized')
    MusicKit.configure({
      developerToken: data?.token,
      app: {
        name: "Raycast Music",
        build: "0.0.1",
      },
    });
  }, [data]);

  async function authorize() {
    if (!instance) return;

    try {
      const token = await instance.authorize();
      setToken(token);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-8 w-screen min-h-screen">
      <h1 className="text-5xl font-bold text-center">
        <Balancer>
          Authenticate <br />
          <i className="font-serif" style={{ fontWeight: 400 }}>
            Raycast Music
          </i>
        </Balancer>
      </h1>

      {token ? (
        <Link
          href={`raycast://extensions/fedevitaledev/music/login?context=${JSON.stringify(
            { token }
          )}`}
        >
          <Button className="min-w-[200px]">Open Raycast</Button>
        </Link>
      ) : (
        <Button
          className="min-w-[200px]"
          onClick={authorize}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Authenticate"}
        </Button>
      )}

      <Script async onError={(e) => console.error('Could not load MuiscKit', e)} onLoad={() => console.log('MusicKit Script Loaded')} src="https://js-cdn.music.apple.com/musickit/v1/musickit.js" />
    </div>
  );
}
