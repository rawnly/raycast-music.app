import { z } from "zod";
import { env } from "./env";

const TINYBIRD_BASE = "https://api.tinybird.co/v0";

const responseSchema = z.object({
  successfull_rows: z.number(),
  quarantined_rows: z.number(),
});

export type TinybirdResponse =
  | {
    success: true;
    data: z.infer<typeof responseSchema>;
  }
  | {
    success: false;
    error: unknown;
  };

export const ingest = async <T>(
  data: T,
  datasource: string
): Promise<TinybirdResponse> => {
  const response = await fetch(
    `${TINYBIRD_BASE}/datasources?name=${datasource}`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${env.TINYBIRD_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    return {
      success: false,
      error: await response.text(),
    };
  }

  const body = await response.json();
  const b = responseSchema.safeParse(body);

  if (!b.success) {
    return {
      success: false,
      error: body,
    };
  }

  return {
    success: true,
    data: b.data,
  };
};
