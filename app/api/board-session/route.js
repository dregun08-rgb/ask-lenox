import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

const COOKIE = "lenox_board_session";
const MAX_AGE = 60 * 60 * 8;

function secret() {
  return process.env.BOARD_SESSION_SECRET || "";
}

function token() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  const signature = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function valid(value) {
  if (!value || !secret()) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try { return JSON.parse(Buffer.from(payload, "base64url").toString()).exp > Date.now(); } catch { return false; }
}

function response(body, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(request) {
  return response({ authenticated: valid(request.cookies.get(COOKIE)?.value) });
}

export async function POST(request) {
  if (!process.env.BOARD_ADMIN_PASSWORD || !secret()) return response({ error: "Board authentication is not configured." }, 503);
  const { password } = await request.json().catch(() => ({}));
  if (typeof password !== "string" || password.length !== process.env.BOARD_ADMIN_PASSWORD.length || !timingSafeEqual(Buffer.from(password), Buffer.from(process.env.BOARD_ADMIN_PASSWORD))) return response({ error: "Incorrect password." }, 401);
  const result = response({ authenticated: true });
  result.cookies.set(COOKIE, token(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: MAX_AGE, path: "/" });
  return result;
}

export async function DELETE() {
  const result = response({ authenticated: false });
  result.cookies.set(COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 0, path: "/" });
  return result;
}
