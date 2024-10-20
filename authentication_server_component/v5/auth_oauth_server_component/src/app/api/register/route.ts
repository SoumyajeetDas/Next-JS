/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from '@/lib/dbConnect';
import { createUser } from '@/queries/users';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Create a DB Conenction
  await dbConnect();
  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);
  // Form a DB payload
  const newUser = {
    name,
    password: hashedPassword,
    email,
  };
  // Update the DB
  try {
    await createUser(newUser);
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }

  return Response.json({ message: 'User Created' }, { status: 201 });
};
