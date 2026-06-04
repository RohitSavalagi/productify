import type { Request, Response } from "express";
import * as queries from './../db/queries';
import { getAuth } from "@clerk/express";

export async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await queries.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error("error getting products:", error);
        res.status(500).json({ error: "Failed to get products" });
    }
}

// Get products by user (protected)
export async function getMyProducts(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        const products = await queries.getProductsByUserId(userId);
        return res.status(200).json(products);
    } catch(error) {
        console.error("Error getting user products");
        return res.status(500).json({ error: "Failed to get user products" });
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const product = await queries.getProductById(id as string);

        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("error getting products:", error);
        res.status(500).json({ error: "Failed to get products" });
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const {
            description,
            imageUrl,
            title,
        } = req.body;

        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        if (!description || !imageUrl || !title) {
            return res.status(400).json({ error: "Title, description and imageURL are required" });
        }

        const product = await queries.createProduct({
            description,
            imageUrl,
            title,
            userId
        });

        return res.status(201).json(product);
    } catch(error) {
         console.error("Error creating product:", error);
        return res.status(500).json({ error: "Failed to create product" });
    }
}

export async function updateProduct(req: Request, res:Response) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }

        const { id } = req.params;
        const { title, description, imageUrl } = req.body;

        const existingProduct = await queries.getProductById(id as string);
        if (!existingProduct) {
            return res.status(404).json({
                error: `product with id ${id} is not found`
            });
        }

        if (existingProduct.userId !== userId) {
            return res.status(403).json({
                error: "you can only update your own products"
            });
        }

        const product = await queries.updateProduct(id as string, {
            title,
            description,
            imageUrl,
        })

        return res.status(200).json(product);
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            error: "Failed to update product"
        });
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            res.status(401).json({
                error: 'Unauthorized'
            });
            return;
        }

        const { id } = req.params;
        const existingProduct = await queries.getProductById(id as string);

        if (!existingProduct) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        if (existingProduct.userId !== userId) {
            res.status(403).json({
                error: "you can only delete your own products"
            });
            return;
        }

        await queries.deleteProduct(id as string);

        res.status(204).json({
            message: 'Product deleted successfully'
        });
    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: 'Could not delete the product'
        });
    }
}
