import { AnalyticsEvent } from "./models";

type Action = "page.view" | "raycast.command" | "raycast.install";

export async function track(
  action: Action,
  metadata?: Record<string, string | number | boolean>,
  { referrer, userAgent } = {
    userAgent: navigator.userAgent,
    referrer: document.referrer,
  }
) {
  return fetch("./api/analytics", {
    method: "POST",
    body: JSON.stringify({
      action,
      page: window.location.pathname,
      properties: metadata,
      timestamp: new Date().toISOString(),
      userAgent,
      referrer,
    } satisfies AnalyticsEvent),
  });
}
