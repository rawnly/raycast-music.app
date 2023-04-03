import { axiom } from "@/lib/axiom";
import { env } from "@/lib/env";
import { AnalyticsEvent } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Promise<unknown>;
  const event = AnalyticsEvent.safeParse(body);

  if (!event.success) {
    return NextResponse.json(
      {
        title: "Bad Request",
        message: "Invalid request body",
      },
      {
        status: 400,
      }
    );
  }

  const response = await axiom.ingestEvents(
    env.AXIOM_ANALYTICS_DATASOURCE,
    [event.data],
    {
      timestampField: "timestamp",
    }
  );

  return NextResponse.json({
    failed: response.failed,
    ingested: response.ingested,
  });
}
