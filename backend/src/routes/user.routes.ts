import { Router } from "express";
import * as userController from '../controllers/user.controller'
const router = Router();
import { requireAuth } from "@clerk/express";

// /api/users/sync = POST => sync the clerk user to DB (PROTECTED)
router.post('/sync', requireAuth(), userController.syncUser);

export default router;
