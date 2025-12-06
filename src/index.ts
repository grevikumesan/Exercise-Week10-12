import express from 'express';
import { router } from './routes/api';
import { errorMiddleware } from './middlewares/error-middleware';
import { requestLogger } from './middlewares/logger'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use('/api', router);
app.use(errorMiddleware);

app.listen(PORT || 3000, () => {
  console.log(`Connected to port ${PORT}`);
});