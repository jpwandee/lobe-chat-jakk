import { encode }
import { NextResponse }

export const post = async (req: Request) => {
  const str = await req.text()

  return NextResponse.json({ count: encode(str).length })
}
