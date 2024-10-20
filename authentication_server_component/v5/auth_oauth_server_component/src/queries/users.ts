/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@/model/User';

export async function createUser(user: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    await User.create(user);
  } catch (e: any) {
    throw new Error(e);
  }
}
