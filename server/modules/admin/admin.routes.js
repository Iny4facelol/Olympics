import express from 'express';
import { addCenter } from './admin.controller.js';

const router = express.Router();

router.post('/addCenter', addCenter);

export default router;