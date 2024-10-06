import { NextRequest } from 'next/server';

const validate = (token: string | undefined) => {
  const validToken = true;

  if (!validToken || !token) {
    return false;
  }

  return true;
};

export const authMiddleware = (req: NextRequest) => {
  const token = req.headers.get('Authorization')?.split(' ')[1];

  return {
    isValid: validate(token),
  };
};
