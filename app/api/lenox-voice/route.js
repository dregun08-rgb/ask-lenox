export const runtime = "nodejs";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request) {
  if (!OPENAI_API_KEY) {
    return Response.json({ error: "Premium voice is not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const text = String(body.text || "").replace(/\s+/g, " ").trim().slice(0, 1400);

  if (!text) {
    return Response.json({ error: "Text is required." }, { status: 400 });
  }

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "ash",
      response_format: "mp3",
      instructions: "Speak as Lenox, a warm, polished HOA concierge for Hillside at Lenox. Calm, reassuring, premium, clear, friendly, and professional. Avoid sounding robotic or overly theatrical.",
      input: text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    return Response.json({ error: "Premium voice failed.", detail: errorText.slice(0, 300) }, { status: 502 });
  }

  const audio = await response.arrayBuffer();
  return new Response(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
