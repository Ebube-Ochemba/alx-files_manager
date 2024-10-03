import { MongoClient } from 'mongodb';

// Environment variables with defaults
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

const url = `mongodb://${DB_HOST}:${DB_PORT}`;
const dbName = DB_DATABASE;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.db = this.client.db(dbName);
        console.log(`Connected to database: ${dbName}`);
      })
      .catch((err) => {
        console.error(`Failed to connect to MongoDB: ${err.message}`);
      });
  }

  // Check if the MongoDB connection is alive
  isAlive() {
    return this.client && this.client.isConnected();
  }

  // Get the number of users
  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (error) {
      console.error(`Error counting users: ${error}`);
      return 0;
    }
  }

  // Get the number of files
  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (error) {
      console.error(`Error counting files: ${error}`);
      return 0;
    }
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
