import { z } from "zod";

export const AnalyticsEvent = z.object({
  action: z.string(),
  page: z.string(),
  referrer: z.string(),
  userAgent: z.string(),
  timestamp: z.string(),
  properties: z
    .record(z.string(), z.string().or(z.number()).or(z.boolean()))
    .optional(),
});

export type AnalyticsEvent = z.infer<typeof AnalyticsEvent>;
