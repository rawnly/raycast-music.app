import { headers } from "next/headers";
import crypto from "crypto";

export function getVisitorFingerprint() {
  const h = headers();

  const userAgent = h.get("user-agent") || "";
  const acceptedLanguage = h.get("accept-language") || "";
  const encoding = h.get("accept-encoding") || "";
  const timezoneOffset = new Date().getTimezoneOffset() || 0;

  const fingerprint = [
    userAgent,
    acceptedLanguage,
    encoding,
    timezoneOffset,
  ].join("::");

  return crypto.createHash("sha256").update(fingerprint).digest("hex");
}
