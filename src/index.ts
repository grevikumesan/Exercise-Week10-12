import express from 'express';
import { PrismaClient } from '@prisma/client';
import router from './routes/api';
import { requestLogger } from './middlewares/logger';

export const prisma = new PrismaClient(); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use('/api', router);
app.use((req, res, next) => {
    res.status(404).json({
        error: "404 Not Found",
        message: "URL not found"
    });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});