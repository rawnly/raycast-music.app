import { z } from "zod";

const envSchema = z.object({
  TEAM_ID: z.string(),
  AUTH_KEY_ID: z.string(),
  AUTH_KEY: z.string(),
  AXIOM_TOKEN: z.string(),
  AXIOM_DATASOURCE: z.string(),
  AXIOM_ORG_ID: z.string(),
});

export const env = envSchema.parse({
  AUTH_KEY_ID: process.env.AUTH_KEY_ID,
  TEAM_ID: process.env.TEAM_ID,
  AUTH_KEY: process.env.AUTH_KEY,
  AXIOM_TOKEN: process.env.AXIOM_TOKEN,
  AXIOM_DATASOURCE: process.env.AXIOM_DATASOURCE,
  AXIOM_ORG_ID: process.env.AXIOM_ORG_ID,
});
