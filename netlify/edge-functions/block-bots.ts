export default async (request: Request, context: any) => {
  const ref = request.headers.get("referer") || "";
  const ua = request.headers.get("user-agent") || "";

  // Block spam referrers
  const badReferrers = ["wake-up-network.com", "trafficbooster.pro"];
  if (badReferrers.some(d => ref.includes(d))) {
    return new Response("Forbidden", { status: 403 });
  }

  // Block obvious bots (optional)
  if (/bot|crawl|spider/i.test(ua)) {
    return new Response("Forbidden", { status: 403 });
  }

  return context.next();
};
