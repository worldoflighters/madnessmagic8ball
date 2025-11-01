export async function GET() {
  const manifest = {
    miniapp: {
      version: "1",
      name: "Magic 8 Ball",
      subtitle: "Ask the oracle",
      description: "Mystical Magic 8 Ball - ask anything and get your answer",
      homeUrl: "https://madnessmagic8ball.vercel.app",
      iconUrl: "https://madnessmagic8ball.vercel.app/placeholder-logo.png",
      imageUrl: "https://madnessmagic8ball.vercel.app/placeholder.jpg",
      splashImageUrl: "https://madnessmagic8ball.vercel.app/placeholder-logo.png",
      splashBackgroundColor: "#1a0033",
    },
    noindex: true,
  }

  return Response.json(manifest, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  })
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  })
}
