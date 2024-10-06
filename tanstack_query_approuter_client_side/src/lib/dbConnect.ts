import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log('Already connected to DB');
    return;
  }

  // Connect to database
  try {
    const db = await mongoose.connect(
      process.env.MONGO_URI + '/tanstack_approuter' || '',
    );

    // 0 = disconnected
    // 1 = connected
    // 2 = connecting
    // 3 = disconnecting
    // 99 = uninitialized
    connection.isConnected = db.connections[0].readyState;

    console.log('Connected to DB');
  } catch (err) {
    console.error('Database Connection Failed', err);

    // If there is any error connecting gracefully stop the application
    process.exit(1);
  }
}

export default dbConnect;
