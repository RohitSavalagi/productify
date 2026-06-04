import { Router } from "express";
import * as commentController from './../controllers/comment.controller';
import { requireAuth } from "@clerk/express";

const router = Router();

router.post("/:productId", requireAuth(), commentController.createComment);
router.post("/:commentId", requireAuth(), commentController.deleteComment);

export default router; 