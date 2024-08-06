const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${host}:${port}`;
    this.dbName = database;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
    this.db = null;

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  }

  isAlive() {
    return this.db !== null;
  }

  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Failed to get user count:', error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Failed to get file count:', error);
      return 0;
    }
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
