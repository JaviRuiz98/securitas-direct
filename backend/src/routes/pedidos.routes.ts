import express from 'express';
import PedidosController from '../controller/pedidos.controller';

const router = express.Router();

router.post('/new-pedido', [PedidosController.newPedido]);
router.get('/lista', [PedidosController.getListaPedidos]);
export default router;
