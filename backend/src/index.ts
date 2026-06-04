import express from 'express';
import { ENV } from './config/env'
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.route';
import commentRoutes from './routes/comments.route';

const app = express();

app.use(cors({ origin: ENV.FE_URL }));
app.use(clerkMiddleware()); // auth obj will be attached to the req
app.use(express.json()); // parse json
app.use(express.urlencoded({ extended: true }));    // parse form data

app.get('/', (req, res) => {
    res.json({ 
        "message": "Welcome to product IFY API - pg drizzle clerk",
        "endpoints": {
            "users": "/api/users",
            "products": "/api/products",
            "comments": "/api/comments"
        }
    })
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);

app.listen(ENV.PORT, () => {
    console.log(`server is up and running in port: ${ENV.PORT}`);
});
