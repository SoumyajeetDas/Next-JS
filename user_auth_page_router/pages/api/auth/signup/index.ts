import { hashPassword } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Incorrect Method selected',
    });
  }

  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
  }

  const client = await connectToDatabase();

  const db = client.db();

  // Checking if the user already exists
  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: 'Created user!' });
  client.close();
}

export default handler;
