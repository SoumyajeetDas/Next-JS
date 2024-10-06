/* eslint-disable @typescript-eslint/no-explicit-any */
import db from './db';

export const createUser = (email: string, password: string) => {
  const result = db
    .prepare('INSERT INTO users (email, password) VALUES (?, ?)')
    .run(email, password);

  return result.lastInsertRowid;
};

export const getUserByEmail = (
  email: string,
): { id: any; password: string } => {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as {
    id: any;
    password: string;
  };
};
