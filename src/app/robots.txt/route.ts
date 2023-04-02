export async function GET() {
  return new Response(`
User-agent: *
Disallow: /api/

Allow: /
`);
}
