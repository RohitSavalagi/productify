import express from 'express';
import { ENV } from './config/env'
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

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
            products: "/api/products",
            "comments": "/api/comments"
        }
    })
});

app.listen(ENV.PORT, () => {
    console.log(`server is up and running in port: ${ENV.PORT}`);
});
