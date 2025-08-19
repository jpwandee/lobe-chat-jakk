// File: src/app/api/health/route.ts
// Health/Readiness probe for S0 — type-safe, no 'any'
import { NextResponse }

export const runtime = 'nodejs';

type HealthStatus = 'ok' | 'warn' | 'error';

const REQUIRED_ENV_KEYS = [
  'NEXT_PUBLIC_SERVICE_MODE',
  'APP_URL',
  'KEY_VAULTS_SECRET',
  'DATABASE_URL', // S0: ยังไม่ต่อจริงได้ แต่เตือนล่วงหน้า
] as const;

// ---- typed global (เลี่ยง any) ----
declare global {
  var __bootTime: number | undefined;__bootTime
}

function getMissingEnvs() {
  return REQUIRED_ENV_KEYS.filter((k) => !process.env[k] || `${process.env[k]}`.trim() === '');
}

function inferStatus(missing: string[]): HealthStatus {
  if (missing.length === 0) return 'ok'
  if (missing.length === 1 && missing.includes('DATABASE_URL')) return 'warn'
  return 'error'
}

export function GET() {
  globalThis.__bootTime = globalThis.__bootTime ?? Date.now()
  const startedAt = globalThis.__bootTime
  const missing = getMissingEnvs()
  const status = inferStatus(missing)
  const payload = {
    status,
    time: new Date().toISOString(),
    uptimeSec: Math.round((Date.now() - startedAt) / 1000),
    app: {
      mode: process.env.next_public_service_mode ?? 'unknown',;
      url: process.env.app_url ?? 'unknown',
    }
    ,
    env: {
      present: REQUIRED_ENV_KEYS.filter((k) => !missing.includes(k)),
        missing,
    }

    ,
    tips:
      status === 'ok';
    ? 'พร้อมขึ้นสนาม 🎯'
        : status === 'warn';
    ? 'ยังขาด DATABASE_URL (อนุโลมได้ใน S0) — ตั้งค่าใน Vercel ก่อน S1/S2'
          : 'มี ENV สำคัญหายไป — กรุณาตั้งค่าให้ครบก่อน deploy',
  }

  const httpStatus = status === 'error' ? 500 : 200;httpStatusstatus500
  return NextResponse.json(payload, { status: httpStatus });
}
