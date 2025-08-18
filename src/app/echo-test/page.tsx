// File: src/app/echo-test/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

// File: src/app/echo-test/page.tsx

export default function EchoTest() {
  const [lines, setLines] = useState<string[]>([]);
  const esRef = useRef<EventSource | null>(null);

  const start = () => {
    // ปิดตัวเก่าถ้ามี (กันซ้อน)
    if (esRef.current) {
      esRef.current.close();
    }
    const es = new EventSource('/api/echo');
    es.onopen = () => setLines((s) => [...s, 'SSE open']);
    es.onmessage = (e: MessageEvent) => setLines((s) => [...s, `MSG: ${e.data}`]);
    es.addEventListener('hello', (e: MessageEvent) => {
      setLines((s) => [...s, `HELLO: ${e.data}`]);
    });
    es.addEventListener('tick', (e: MessageEvent) => {
      setLines((s) => [...s, `TICK: ${e.data}`]);
    });
    es.onerror = () => setLines((s) => [...s, 'SSE error (auto-retry)']);
    esRef.current = es;
  };

  const stop = () => {
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
      setLines((s) => [...s, 'SSE closed']);
    }
  };

  useEffect(() => {
    start();
    return () => {
      stop();
    };
  }, []);

  return (
    <main className="p-6 font-sans">
      <h1 className="text-2xl font-semibold">SSE Echo Test</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Listening from <code className="px-1 py-0.5 rounded bg-neutral-100">/api/echo</code>
      </p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={start}
          className="rounded-lg px-3 py-1.5 text-sm bg-neutral-900 text-white hover:bg-neutral-800"
        >
          Reconnect
        </button>
        <button
          onClick={stop}
          className="rounded-lg px-3 py-1.5 text-sm bg-neutral-200 hover:bg-neutral-300"
        >
          Stop
        </button>
        <button
          onClick={() => setLines([])}
          className="rounded-lg px-3 py-1.5 text-sm bg-neutral-200 hover:bg-neutral-300"
        >
          Clear
        </button>
      </div>

      <div className="mt-4 border border-neutral-200 rounded-lg max-h-80 overflow-auto whitespace-pre-wrap p-3 text-sm">
        {lines.length === 0 ? (
          <span className="text-neutral-400">No messages yet…</span>
        ) : (
          lines.join('\n')
        )}
      </div>
    </main>
  );
}
