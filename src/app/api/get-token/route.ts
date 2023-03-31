import ms from "ms";
import { type NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  const alg = "ES256";

  const pkcs8 = Buffer.from(env.AUTH_KEY, "base64").toString("utf8");
  const privateKey = await jose.importPKCS8(pkcs8, alg);

  const jwt = new jose.SignJWT({
    origin: [
      "https://raycast-music.app",
      "https://raycast-music.vercel.app",
      "https://raycast-music.fedevitale.dev",
      "http://localhost:3000",
    ],
  })
    .setProtectedHeader({ alg, kid: env.AUTH_KEY_ID })
    .setIssuedAt()
    .setIssuer(env.TEAM_ID)
    .setExpirationTime("2d");

  const token = await jwt.sign(privateKey);

  return NextResponse.json({
    token,
    expires: Date.now() + ms("2d"),
  });
}

export const runtime = "edge";
