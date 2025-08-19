/* src/app/api/echo/route.ts
   SSE Echo for LobeChat-BEYOND
   - Edge runtime (Hobby: maxDuration <= 60s)
   - force-dynamic / no-store to avoid static caching
   - heartbeat keepalive
   - named + default events
*/

import type { NextRequest } from 'next/server';

// ---------- Route Segment Config ----------
export const runtime = 'edge' as const;            // ใช้ Edge Function
export const maxDuration = 60;                     // Hobby limit 60s
export const dynamic = 'force-dynamic';            // กันถูก prerender
export const revalidate = 0;                       // no SSG cache
export const fetchCache = 'force-no-store';        // กัน caching ชั้น fetch

// ---------- SSE Utils ----------
const encoder = new TextEncoder();

function toUint8(s: string) {
  return encoder.encode(s);
}

function sseData(data: unknown) {
  return `data: ${typeof data === 'string' ? data : JSON.stringify(data)}\n\n`;
}
function sseEvent(event: string, data: unknown) {
  return `event: ${event}\n${sseData(data)}`;
}
function sseComment(text: string) {
  return `: ${text}\n\n`;
}

function baseHeaders(): HeadersInit {
  return {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no', // ปิดบัฟเฟอร์ (รองรับบาง proxy)
    // CORS (กรณีเรียกข้ามโดเมน/ทดสอบ)
    'Access-Control-Allow-Origin': '*',
  };
}

type TickPayload = { i: number; ts: number; echo?: unknown };

// ---------- Core SSE Handler ----------
async function handleSSE(req: NextRequest): Promise<Response> {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  // เปิดสตรีม: ตั้ง retry เริ่มต้น
  await writer.write(toUint8(`retry: 3000\n`));

  // heartbeat กัน connection timeout จาก proxy/CDN
  const heartbeat = setInterval(() => {
    writer.write(toUint8(sseComment(`keepalive ${Date.now()}`))).catch(() => {
      /* no-op */
    });
  }, 20_000);

  // ปิดสตรีมแบบปลอดภัย
  const safeClose = (reason = 'done') => {
    clearInterval(heartbeat);
    writer
      .write(toUint8(sseEvent('close', { reason, ts: Date.now() })))
      .catch(() => {})
      .finally(() => {
        writer.close().catch(() => {});
      });
  };

  // client ยกเลิก (เปลี่ยนหน้า/ปิดแท็บ)
  req.signal.addEventListener('abort', () => safeClose('client-abort'));

  // พารามิเตอร์ทดสอบ
  const url = new URL(req.url);
  const limit = Math.max(1, Math.min(Number(url.searchParams.get('n') ?? 10), 100)); // จำนวน tick
  const delay = Math.max(100, Math.min(Number(url.searchParams.get('ms') ?? 800), 10_000)); // ช่วงเวลา

  // ถ้ามี echo message (GET: ?q=...  /  POST: body)
  let initialEcho: unknown = undefined;
  if (req.method === 'GET') {
    const q = url.searchParams.get('q');
    if (q) initialEcho = { q };
  } else if (req.method === 'POST') {
    try {
      const ctype = req.headers.get('content-type') || '';
      if (ctype.includes('application/json')) initialEcho = await req.json();
      else initialEcho = await req.text();
    } catch {
      // no-op
    }
  }

  // ส่งทักทาย (named + default)
  await writer.write(
    toUint8(
      sseEvent('hello', { hello: 'ψJAKK.DEV-COMPANION', ts: Date.now() }) +
        sseData({ hello: 'ψJAKK.DEV-COMPANION', ts: Date.now() }), // default duplicate
    ),
  );

  // ถ้ามีข้อความ echo ส่งออกก่อนหนึ่งชุด
  if (initialEcho !== undefined) {
    await writer.write(toUint8(sseEvent('echo', initialEcho) + sseData(initialEcho)));
  }

  // เริ่ม tick ต่อเนื่อง
  let i = 0;
  const timer = setInterval(async () => {
    i++;
    const payload: TickPayload = { i, ts: Date.now(), echo: initialEcho };
    try {
      await writer.write(toUint8(sseEvent('tick', payload) + sseData(payload)));
    } catch {
      clearInterval(timer);
      return safeClose('writer-error');
    }
    if (i >= limit) {
      clearInterval(timer);
      safeClose('limit-reached');
    }
  }, delay);

  return new Response(readable, { headers: baseHeaders() });
}

// ---------- HTTP Methods ----------
export async function GET(req: NextRequest) {
  return handleSSE(req);
}

export async function POST(req: NextRequest) {
  return handleSSE(req);
}

// (ตัวเลือก) Preflight CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...baseHeaders(),
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
