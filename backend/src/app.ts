import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// Configurar CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Asegúrate de que OPTIONS solicitudes respondan correctamente
app.options('*', cors());

export default app;
