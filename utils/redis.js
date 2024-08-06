import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    // Create a Redis client instance
    this.client = createClient();
    this.isClientConnected = true;  
    // Handle any errors that occur with the Redis client
    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
      this.isClientConnected = false;
    });

    // Log when the Redis client is successfully connected and ready
    this.client.on('ready', () => {
      this.isClientConnected = true;
    });

    // Promisify Redis client methods to use with async/await
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
  }

  // Method to check if the Redis client is currently connected
  isAlive() {
    return this.isClientConnected;
  }

  // Async method to retrieve the value associated with a given key
  async get(key) {
    return await this.getAsync(key);
  }

  // Async method to set a value for a given key with an expiration time in seconds
  async set(key, value, duration) {
    await this.setAsync(key, value, 'EX', duration);
  }

  // Async method to delete a value associated with a given key
  async del(key) {
    await this.delAsync(key);
  }
}

// Create and export an instance of the RedisClient class
const redisClient = new RedisClient();
export default redisClient;
