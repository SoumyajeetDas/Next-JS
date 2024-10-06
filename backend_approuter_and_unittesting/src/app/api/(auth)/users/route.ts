// export const dynamic = "force-dynamic";

export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../../lib/model/user';
import connectToDB from '../../../../../lib/model/db';

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const users = await User.find();

    return NextResponse.json(
      {
        status: 200,
        message: 'Users fetched successfully',
        users,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let body = null;
    try {
      // This will be used when normal API is called
      body = await req.json();
    } catch {
      // This will be used when
      body = JSON.parse(req.body as unknown as string);
    }

    await connectToDB();

    const { username, email, password } = body;

    const user = await User.create({ username, email, password });

    return NextResponse.json(
      {
        status: 201,
        message: 'User created successfully',
        user,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
