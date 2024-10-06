import { connectionDatabse, inserDocument } from '@/helpers/db-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type ReturnMessage = {
  message: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ReturnMessage>,
) => {
  if (req.method === 'POST') {
    const userEmail = (req.body as { email?: string })?.email;
    if (!userEmail || !userEmail.includes('@')) {
      return res.status(422).json({ message: 'Invalid email address' });
    }

    let client;

    try {
      client = await connectionDatabse();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await inserDocument(client, { email: userEmail }, 'newsletter');

      client.close();
    } catch {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    return res.status(201).json({ message: 'Signed up!' });
  }
};

export default handler;
