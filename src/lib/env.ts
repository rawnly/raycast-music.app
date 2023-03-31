import { z } from "zod";

const envSchema = z.object({
  TEAM_ID: z.string(),
  AUTH_KEY_ID: z.string(),
  AUTH_KEY: z.string(),
  TINYBIRD_TOKEN: z.string(),
  TINYBIRD_DATASOURCE: z.string(),
});

export const env = envSchema.parse({
  AUTH_KEY_ID: process.env.AUTH_KEY_ID,
  TEAM_ID: process.env.TEAM_ID,
  AUTH_KEY: process.env.AUTH_KEY,
  TINYBIRD_TOKEN: process.env.TINYBIRD_TOKEN,
  TINYBIRD_DATASOURCE: process.env.TINYBIRD_DATASOURCE,
});
