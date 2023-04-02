"use client";

import { track } from "@/lib/analytics";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Tracker({ visitorId }: { visitorId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    track("page.view", {
      visitorId,
      pathname,
      isMobile: window.innerWidth <= 768,
    });
  }, [visitorId, pathname]);

  return null;
}
