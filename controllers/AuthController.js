/* eslint-disable import/no-named-as-default */

// Import UUID library for generating unique tokens
import { v4 as uuidv4 } from 'uuid';
// Import Redis client for interacting with the Redis database
import redisClient from '../utils/redis';

// Export AuthController class for handling authentication
export default class AuthController {
  // Method to generate and return a new authentication token
  static async getConnect(req, res) {
    const { user } = req; // Extract user from request
    const token = uuidv4(); // Generate a new unique token

    // Store the token in Redis with an expiration time of 24 hours
    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    // Respond with the generated token
    res.status(200).json({ token });
  }

  // Method to invalidate a token and log out the user
  static async getDisconnect(req, res) {
    const token = req.headers['x-token']; // Get token from request headers

    // Remove the token from Redis
    await redisClient.del(`auth_${token}`);
    // Respond with no content status
    res.status(204).send();
  }
}
