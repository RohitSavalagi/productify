import { Router } from "express";
import * as productController from '../controllers/product.controller'
import { requireAuth } from "@clerk/express";

const router = Router();

// GET /api/products => Get all products (public)
router.get('/', productController.getAllProducts);
router.get('/my', requireAuth(), productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', requireAuth(), productController.createProduct);
router.put('/:id', requireAuth(), productController.updateProduct);

export default router;