"use client";

import { ThemeProvider } from "next-themes";
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'

if ( typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  })
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <ThemeProvider
        attribute="class"
        enableSystem
        storageKey={"raycast-music-theme"}
      >
        {children}
      </ThemeProvider>
    </PostHogProvider>
  );
}
