// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {   
  const startedAt = new Date().toISOString();
  const required = ['NEXT_PUBLIC_SERVICE_MODE', 'APP_URL'];
  const envOk = required.every((k) => process.env[k] !== undefined);

  return NextResponse.json(
    {
      status: envOk ? 'ok' : 'partial',
      nodeEnv: process.env.NODE_ENV,
      startedAt,
      env: {
        NEXT_PUBLIC_SERVICE_MODE: process.env.NEXT_PUBLIC_SERVICE_MODE ?? null,
        APP_URL: process.env.APP_URL ?? null,
      },
      checks: { required },
    },
    { status: envOk ? 200 : 206 },
  );
}
