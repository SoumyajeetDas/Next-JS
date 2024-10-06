import {
  connectionDatabse,
  getAllDocuments,
  inserDocument,
} from '@/helpers/db-utils';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseType =
  | {
      message: string;
      comment: {
        id: ObjectId;
        email: string;
        name: string;
        text: string;
        eventId: typeof ObjectId;
      };
    }
  | {
      comments: { id: string; name: string; text: string }[];
    }
  | { message: string };

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) => {
  let client;

  try {
    client = await connectionDatabse();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const eventId = req.query.eventId;
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
    }
    const newComment = {
      email: email as string,
      name: name as string,
      text: text as string,
      eventId: eventId as unknown as typeof ObjectId,
    };

    let result;
    try {
      result = await inserDocument(client, newComment, 'newsletter');

      client.close();
    } catch {
      res.status(500).json({ message: 'Inserting data failed!' });
      return;
    }

    // Restrict the the 
    const newCommentData: typeof newComment & { id: ObjectId } = {
      id: result.insertedId,
      ...newComment,
    };

    res
      .status(201)
      .json({ message: 'Added comment.', comment: newCommentData });
  } else if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', { _id: -1 });
      res.status(200).json({
        comments: documents as unknown as {
          id: string;
          name: string;
          text: string;
        }[],
      });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed.' });
    }
  }

  client.close();
};

export default handler;
