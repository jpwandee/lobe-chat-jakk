// src/app/api/echo/route.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

/**
 * Run on Edge for low-latency streaming
 * You can switch to 'nodejs' if you need Node APIs.
 */
export const runtime = 'edge';
/**
 * Route is always dynamic (no caching), important for streaming.
 */
export const dynamic = 'force-dynamic';
/**
 * Vercel Functions timeout (in seconds). Plan-dependent upper-bounds.
 * Must be between 1 and 300 on Vercel.
 */
export const maxDuration = 60;

type EchoBody = {
  message?: string;
  /** split unit: 'char' | 'word' */
  unit?: 'char' | 'word';
  /** delay between chunks in ms */
  delayMs?: number;
  /** number of repeats (for load-test) */
  repeat?: number;
  /** if false, respond as JSON (non-stream) */
  stream?: boolean;
};

const encoder = new TextEncoder();

/* ----------------------------- CORS Utilities ----------------------------- */

function getCorsHeaders(req?: NextRequest): Record<string, string> {
  const origin = req?.headers.get('origin') ?? '*';
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    'Access-Control-Max-Age': '86400',
  };
}

export function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(req) });
}

/* ---------------------------- Helper: SSE write --------------------------- */

function sseWrite(controller: ReadableStreamDefaultController, data: unknown) {
  const payload =
    typeof data === 'string' ? data : JSON.stringify(data);
  controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
}

function sseEvent(controller: ReadableStreamDefaultController, event: string, data?: unknown) {
  controller.enqueue(encoder.encode(`event: ${event}\n`));
  if (data !== undefined) controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n`));
  controller.enqueue(encoder.encode(`\n`));
}

/* --------------------------------- GET ----------------------------------- */
/**
 * Quick health check (non-stream): /api/echo?message=hi
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const message = searchParams.get('message') ?? 'pong';
  return NextResponse.json(
    { ok: true, message },
    { headers: getCorsHeaders(req) },
  );
}

/* --------------------------------- POST ---------------------------------- */
/**
 * Streaming echo (SSE).
 * Body example:
 * {
 *   "message": "สวัสดีครับ พ่อ",
 *   "unit": "word",
 *   "delayMs": 80,
 *   "repeat": 1,
 *   "stream": true
 * }
 */
export async function POST(req: NextRequest) {
  let body: EchoBody;
  try {
    body = (await req.json()) as EchoBody;
  } catch {
    // If no/invalid JSON, fall back to defaults
    body = {};
  }

  const {
    message = 'Hello from /api/echo 👋',
    unit = 'char',
    delayMs = 50,
    repeat = 1,
    stream = true,
  } = body;

  // Non-stream JSON mode (useful for simple checks or plan limits)
  if (!stream) {
    const pieces = splitByUnit(message, unit);
    return NextResponse.json(
      { ok: true, unit, count: pieces.length, message },
      { headers: getCorsHeaders(req) },
    );
  }

  const headers: HeadersInit = {
    ...getCorsHeaders(req),
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    'X-Accel-Buffering': 'no', // disable buffering on some proxies
  };

  const streamResp = new ReadableStream({
    start(controller) {
      // Send an initial retry hint for SSE clients (optional)
      controller.enqueue(encoder.encode('retry: 10000\n\n'));

      // If client disconnects, abort work
      const abort = () => {
        try {
          sseEvent(controller, 'abort', { reason: 'client_disconnected' });
        } finally {
          controller.close();
        }
      };

      // NextRequest.signal works on Edge; listen to abort
      const signal = req.signal as AbortSignal | undefined;
      if (signal) {
        if (signal.aborted) {
          abort();
          return;
        }
        const onAbort = () => abort();
        signal.addEventListener('abort', onAbort, { once: true });

        // Cleanup: remove listener when stream closes
        const originalClose = controller.close.bind(controller);
        controller.close = () => {
          signal.removeEventListener('abort', onAbort);
          originalClose();
        };
      }

      void (async () => {
        try {
          const pieces = splitByUnit(message, unit);
          for (let r = 0; r < Math.max(1, repeat); r++) {
            for (const chunk of pieces) {
              // When aborted, stop early
              if (signal?.aborted) throw new Error('aborted');

              sseWrite(controller, chunk);
              // Minimal delay to simulate token streaming
              if (delayMs > 0) await sleep(delayMs);
            }
            if (repeat > 1 && r < repeat - 1) {
              sseEvent(controller, 'repeat', { index: r + 1 });
            }
          }

          sseEvent(controller, 'done', { bytes: message.length });
          controller.close();
        } catch (err) {
          // Graceful error event for SSE clients
          sseEvent(controller, 'error', {
            message: err instanceof Error ? err.message : 'unknown_error',
          });
          controller.close();
        }
      })();
    },
    cancel() {
      // Consumer cancelled; nothing else to do since we close in start() on abort.
    },
  });

  return new Response(streamResp, { status: 200, headers });
}

/* -------------------------------- Utils ---------------------------------- */

function splitByUnit(text: string, unit: 'char' | 'word'): string[] {
  if (unit === 'word') {
    // Keep punctuation attached to words for simplicity
    return text.split(/\s+/).filter(Boolean).map((w, i, arr) => (i < arr.length - 1 ? `${w} ` : w));
  }
  // default: char stream
  return Array.from(text);
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
