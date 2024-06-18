import { Router } from 'express';
import pedidosRouter from './pedidos.routes';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/pedido', pedidosRouter);

export default router;
