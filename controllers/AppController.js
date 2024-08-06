import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

export const getStatus = async (req, res) => {
  try {
    const redisStatus = await redisClient.isAlive();
    const dbStatus = await dbClient.isAlive();
    res.status(200).json({ redis: redisStatus, db: dbStatus });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getStats = async (req, res) => {
  try {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();
    res.status(200).json({ users: nbUsers, files: nbFiles });
  } catch (error) {
    res.satus(500).json({ error: 'Internal Server Error' });
  }
};
