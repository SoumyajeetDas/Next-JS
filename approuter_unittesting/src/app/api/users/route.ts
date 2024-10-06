import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json([
    {
      id: 1,
      username: 'anson',
    },
    {
      id: 2,
      username: 'jack',
    },
    {
      id: 3,
      username: 'mike',
    },
  ]);
}
