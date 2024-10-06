// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

type SuccessResponse = {
  message?: string;
  feedback:
    | {
        id: string;
        email: string;
        text: string;
      }[]
    | { id: string; email: string; text: string };
};

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath: string): {
  id: string;
  email: string;
  text: string;
}[] {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString());
  return data;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse>,
) {
  if (req.method === 'POST') {
    const { email, text } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text,
    };

    // store that in a database or in a file
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}
