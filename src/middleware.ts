import { handlePaths } from "next-wayfinder";
import { NextResponse } from "next/server";

export default handlePaths([
  {
    path: "/install",
    handler: () =>
      NextResponse.redirect(
        new URL("raycast://extensions/fedevitaledev/music?source=web"),
      ),
  },
]);
