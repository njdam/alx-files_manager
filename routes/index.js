// eslint-disable-next-line no-unused-vars
import express  from 'express';
import { getStatus, getStats } from '../controllers/AppController';

const router = express.Router();

// Define routes
router.get('/status', getStatus);
router.get('/stats', getStats);

export default router;
