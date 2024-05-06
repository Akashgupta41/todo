import { Router } from "express";
import {postTask,getAllTask} from '../controllers/todo.js'
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.post('/post',authMiddleware,postTask);
router.get('/getall',authMiddleware,getAllTask);

export default router;