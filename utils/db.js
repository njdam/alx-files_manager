import mongodb from 'mongodb';

// Represents a MongoDB client.
class DBClient {
   // Creates a new DBClient instance.
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  // Checking if client's connection to the MongoDB server is active
  isAlive() {
    return this.client.isConnected();
  }

  // Retrieves the number of users in the database.
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Retrieves the number of files in the database.
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  // Retrieves a reference to the `users` collection.
  async usersCollection() {
    return this.client.db().collection('users');
  }

  // Retrieves a reference to the `files` collection.
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
