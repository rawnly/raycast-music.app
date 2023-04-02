import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import AxiomClient from "@axiomhq/axiom-node";
import { env } from "@/lib/env";

const payloadSchema = z.object({
  command: z.string(),
  timestamp: z.string(),
  parameters: z.object({
    raycastVersion: z.string(),
    success: z.boolean(),
    mode: z.string(),
  }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const payload = payloadSchema.safeParse(body);

  if (!payload.success) {
    console.warn("Invalid payload", body, payload.error);

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

  const axiom = new AxiomClient({
    token: env.AXIOM_TOKEN,
    orgId: env.AXIOM_ORG_ID,
  });

  const res = await axiom.ingestEvents(env.AXIOM_DATASOURCE, [payload.data]);

  return NextResponse.json({
    failed: res.failed,
    ingested: res.ingested,
  });
}
