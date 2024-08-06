import express from 'express';
import { getStatus, getStats } from '../controllers/AppController.js';

const router = express.Router();

// Define routes
router.get('/status', getStatus);
router.get('/stats', getStats);

export default router;
