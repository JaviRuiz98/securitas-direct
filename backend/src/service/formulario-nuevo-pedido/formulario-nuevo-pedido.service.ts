import { parametrosPedido } from "../../interfaces/formulario-pedido";
export class FormularioPedidoService {
  static async nuevoPedido(pedido: parametrosPedido): Promise<boolean> {
    const query = ` 
      INSERT INTO pedidos (id, id_cliente, nombre, apellido_1, apellido_2, nif, email, telefono_1, telefono_2, direccion, localidad, provincia, codpos, canal, id_agente,nid_tienda, telefono_tienda, email_tienda, tipo_instalacion, oferta, comentarios)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      const values = [pedido.id, pedido.id_cliente, pedido.nombre,  pedido.apellido_1,  pedido.apellido_2, pedido.nif, pedido.email,
        pedido.telefono_1, pedido.telefono_2, pedido.direccion, pedido.localidad, pedido.provincia, pedido.codpos, pedido.canal, 
        pedido.id_agente, pedido.id_tienda, pedido.telefono_tienda, pedido.email_tienda,  pedido.tipo_instalacion, pedido.oferta, pedido.comentarios
      ];
    try {
      return true;
    } catch (e) {
      console.error("Error getAllGastos:", e);
      throw e;  
    }
  }
}
