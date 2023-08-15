import { z } from "zod";

const envSchema = z.object({
  TEAM_ID: z.string(),
  AUTH_KEY_ID: z.string(),
  AUTH_KEY: z.string(),
});

export const env = envSchema.parse({
  AUTH_KEY_ID: process.env.AUTH_KEY_ID,
  TEAM_ID: process.env.TEAM_ID,
  AUTH_KEY: process.env.AUTH_KEY,
});
