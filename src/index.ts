import express from 'express';
import dotenv from 'dotenv';
import personRoutes from './routes/personRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', personRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});