import express from 'express';
import PedidosController from '../controller/pedidos.controller';

const router = express.Router();

router.post('/new-pedido', [PedidosController.newPedido]);
router.get('/lista', [PedidosController.getListaPedidosByDate]);
router.get('/lista-completa', [PedidosController.getListaPedidos]);
router.post('/almacenar-pedidos', [PedidosController.almacenarPedidos]);
export default router;
