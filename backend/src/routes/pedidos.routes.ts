import express from 'express';
import PedidosController from '../controller/pedidos.controller';

const router = express.Router();

router.post('/new-pedido', [PedidosController.newPedido]);

export default router;
