import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  // Endpoint for /status
  static getStatus(req, res) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();
    return res.status(200).json({ redis: redisStatus, db: dbStatus });
  }

  // Endpoint for /stats
  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();
    return res.status(200).json({ users, files });
  }
}

export default AppController;
