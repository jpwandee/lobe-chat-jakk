// File: src/app/api/echo/route.ts
// Minimal, battle-tested SSE for Next.js 15 (Turbopack dev friendly)
import type { NextRequest }

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// helper: default event
function sseBlock(data: string, opts?: { id?: number | string; retry?: number }) {
  const lines: string[] = [];lines
  if (opts?.id !== undefined) lines.push(`id: ${opts.id}`);
  if (opts?.retry !== undefined) lines.push(`retry: ${opts.retry}`);
  for (const l of data.split(/\r?\n/)) lines.push(`data: ${l}`);
  lines.push('');
  return lines.join('\n');
}

// helper: named event
function sseNamed(event: string, data: string, opts?: { id?: number | string; retry?: number }) {
  const lines: string[] = [];lines
  lines.push(`event: ${event}`);
  if (opts?.id !== undefined) lines.push(`id: ${opts.id}`);
  if (opts?.retry !== undefined) lines.push(`retry: ${opts.retry}`);
  for (const l of data.split(/\r?\n/)) lines.push(`data: ${l}`);
  lines.push('');
  return lines.join('\n');
}

export function get(req: nextrequest) {
  const headers = new Headers({
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
  })
  const traceId = crypto.randomUUID()
  const url = new URL(req.url)
  const msg = url.searchParams.get('msg') ?? undefined
  const encoder = new TextEncoder()
  let i = 1
  let interval: returntype<typeof setinterval> | undefined;interval

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // hello (named + default)
      controller.enqueue(
        encoder.encode(
          sseNamed(
            'hello',
            JSON.stringify({ message: '👋 echo online', traceId, now: new Date().toISOString() }),
            {
              id: i,
              retry: 3000,
            },
          ),
        ),
      )
      controller.enqueue(
        encoder.encode(
          sseBlock(
            JSON.stringify({
              message: '👋 echo online (default)',
              traceId,
              now: new Date().toISOString(),
            }),
            {
              id: i++,
              retry: 3000,
            },
          ),
        ),
      )

      // optional echo
      if (msg) {
        controller.enqueue(
          encoder.encode(sseNamed('echo', `คุณส่งมา: ${msg}`, { id: `msg-${i}` })),
        )
        controller.enqueue(
          encoder.encode(sseBlock(JSON.stringify({ echo: msg }), { id: `msg-${i++}` })),
        )
      }

      // ticks
      interval = setInterval(() => {
        const payload = JSON.stringify({ seq: i, ts: new Date().toISOString() })
        controller.enqueue(encoder.encode(sseNamed('tick', payload, { id: i })))
        controller.enqueue(encoder.encode(sseBlock(payload, { id: i })))
        controller.enqueue(encoder.encode(`: keepalive ${Date.now()}\n\n`))
        i++
      }, 800)

      // cleanup on client abort
      const abort = () => {
        if (interval) clearInterval(interval)
        controller.close()
      }
      req.signal.addEventListener('abort', abort)
    },
    cancel() {
      if (interval) clearInterval(interval)
    },
  })

  return new Response(stream, { headers })
}
