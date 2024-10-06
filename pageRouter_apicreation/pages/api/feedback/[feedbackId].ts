import { NextApiRequest, NextApiResponse } from 'next';
import { buildFeedbackPath, extractFeedback } from './feedback';

// Dynamic API route can support all the HTTP methods like GET, POST, PUT, DELETE, etc.
function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ feedback: string }>,
) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId,
  ) as unknown as string;
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
