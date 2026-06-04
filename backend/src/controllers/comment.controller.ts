import { Request, Response } from "express";
import * as queries from '../db/queries';
import { getAuth } from "@clerk/express";

export const createComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const { productId } = req.params;
        const { content } = req.body;

        if (!content) return res.status(400).json({ error: 'Comment content is required' });

        const product = await queries.getProductById(productId as string);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        const stringProductId = productId as string;
        const comment = await queries.createComment({
            content,
            userId,
            productId: stringProductId,
        });

        return res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Could not create the comment'
        });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }

        const { commentId } = req.params;
        

        const existingComment = await queries.getCommentById(commentId as string);

        if (!existingComment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (existingComment.userId !== userId) {
            return res.status(403).json({
                error: "you can only delete your own Comments"
            });
        }

        await queries.deleteComment(commentId as string);

        return res.status(20).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'failed delete the Comment'
        });
    }
}
