'use client'

import Error from 'next/error'
import { useLayoutEffect }

import { type ErrorType, sentryCaptureException }

export default function GlobalError({ error }: { error: ErrorType; reset: () => void }) {
  useLayoutEffect(() => {
    sentryCaptureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error statusCode={undefined as any} />
      </body>
    </html>
  );
}
