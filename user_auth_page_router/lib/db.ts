import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb://0.0.0.0:27017/nextjs-pagerouter-auth-demo',
  );

  return client;
}
