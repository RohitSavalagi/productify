import express from 'express';
import { ENV } from './config/env'
import path from 'path';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.route';
import commentRoutes from './routes/comments.route';

const app = express();

app.use(cors({ origin: ENV.FE_URL, credentials: true }));
app.use(clerkMiddleware()); // auth obj will be attached to the req
app.use(express.json()); // parse json
app.use(express.urlencoded({ extended: true }));    // parse form data

app.get('/api/health', (req, res) => {
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

if (ENV.NODE_ENV === 'production') {
    const __dirname = path.resolve()

    // serve static files from fronted/dist
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // handle SPA routing - send all non API routes to index.html - react app
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

app.listen(ENV.PORT, () => {
    console.log(`server is up and running in port: ${ENV.PORT}`);
});
