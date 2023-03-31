import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.redirect(
    new URL("raycast://extensions/fedevitaledev/music?source=web")
  );
};
