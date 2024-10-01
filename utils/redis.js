import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Promisified version of the Redis GET method
    this.getAsync = promisify(this.client.get).bind(this.client);

    // Error handling
    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error.message}`);
    });
  }

  // Check if Redis client is connected
  isAlive() {
    return this.client.connected;
  }

  // Get value for a key
  async get(key) {
    try {
      const value = await this.getAsync(key);
      return value;
    } catch (error) {
      console.error(`Error getting key ${key}: ${error}`);
      return null;
    }
  }

  // Set value for a key with expiration time
  async set(key, value, duration) {
    try {
      this.client.setex(key, duration, value);
    } catch (error) {
      console.error(`Error setting key ${key}: ${error}`);
    }
  }

  // Delete key from Redis
  async del(key) {
    try {
      this.client.del(key);
    } catch (error) {
      console.error(`Error deleting key ${key}: ${error}`);
    }
  }
}

// Export the RedisClient instance
const redisClient = new RedisClient();
export default redisClient;
