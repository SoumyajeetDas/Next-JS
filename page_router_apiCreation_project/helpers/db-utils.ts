import { MongoClient, ObjectId, Sort } from 'mongodb';

export const connectionDatabse = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://Soumyajeet:Soumya1234@cluster0.nzjuntg.mongodb.net/events?retryWrites=true&w=majority&appName=Cluster0',
  );

  return client;
};

export const inserDocument = async (
  client: MongoClient,
  document:
    | { email: string }
    | { email: string; name: string; text: string; eventId: typeof ObjectId },
  collection: string,
) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
};

export async function getAllDocuments(
  client: MongoClient,
  collection: string,
  sort: Sort,
) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
