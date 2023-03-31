import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as tinybird from "@/lib/tinybird";
import { env } from "@/lib/env";

const payloadSchema = z.object({
  command: z.string(),
  parameters: z.record(z.string(), z.string()),
});

export async function POST(request: NextRequest) {
  const payload = payloadSchema.safeParse(request.body);

  if (!payload.success) {
    return NextResponse.json(
      {
        error: "Bad Request",
        message: "Invalid payload",
      },
      {
        status: 400,
      }
    );
  }

  const response = await tinybird.ingest(payload.data, env.TINYBIRD_DATASOURCE);

  if (!response.success) {
    console.error(response.error);
  }

  return NextResponse.json({
    ok: response.success,
  });
}
