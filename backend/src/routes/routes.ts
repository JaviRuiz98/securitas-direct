import { Router } from 'express';
import pedidosRouter from './pedidos.routes';

const router = Router();

// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/pedido', pedidosRouter);

export default router;
