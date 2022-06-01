import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.NODE_PORT || 3000;

const start = () => {
    return app.use(cors())
        .use("/quotes", routes)
        .use((_req, res) => res.status(404).json({ success: false, error: "Route not found" }))
        .listen(port, () => console.log(`Server ready on port ${port}`));
}

export default {
    start
};