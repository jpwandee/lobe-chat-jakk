// src/app/api/echo/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const msg = searchParams.get('msg') ?? 'hello from SSE';
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // คอมเมนต์ (heartbeat)
      controller.enqueue(encoder.encode(`: connected\n\n`));
      // แจ้งพร้อม
      controller.enqueue(
        encoder.encode(
          `event: ready\ndata: ${JSON.stringify({ ts: Date.now() })}\n\n`,
        ),
      );
      // payload หลัก (ข้อความ)
      controller.enqueue(encoder.encode(`data: ${msg}\n\n`));
      // จบสตรีม
      controller.enqueue(encoder.encode(`event: done\ndata: bye\n\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
