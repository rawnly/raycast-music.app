import ms from "ms";
import { NextResponse } from "next/server";
import * as jose from "jose";
import { env } from "@/lib/env";

export async function GET() {
  try {
    const alg = "ES256";
    const pkcs8 = atob(env.AUTH_KEY);
    const privateKey = await jose.importPKCS8(pkcs8, alg);

    const jwt = new jose.SignJWT({
      origin: [
        "https://preview.raycast-music.app",
        "https://raycast-music.app",
        "https://raycast-music.vercel.app",
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : undefined,
      ].filter((s) => !!s),
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
  } catch (error) {
    console.error(error);

    return NextResponse.error();
  }
}

export const runtime = "edge";
