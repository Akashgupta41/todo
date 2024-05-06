import { Router } from "express";
import {Login,Logout,Register,getAll,myAcount,test,test2} from '../controllers/user.js'
import authMiddleware from "../middleware/auth.js";
const router = Router();

router.post("/register", Register);
router.post('/login',Login);
router.get('/logout',authMiddleware, Logout);
router.get('/me',authMiddleware,test);
router.get('/getall',authMiddleware,test2);

export default router;