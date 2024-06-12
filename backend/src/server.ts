import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/routes';
import { Db } from 'typeorm';
import { DB } from './config/typeorm';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:4200', 
  optionsSuccessStatus: 200
};

DB.initialize().then(() => {
  console.log('Database connected');
})

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
