import { parametrosPedido, listaPedidos } from "../../interfaces/formulario-pedido";
import { DB } from "../../config/typeorm";
export class FormularioPedidoService {

  static async getListaPedidos(fecha: Date): Promise<listaPedidos[]> {
    console.log(fecha);
    const query = `
    SELECT *
    FROM lista_pedidos
    WHERE ts_estado > ?;`;
    const values = [fecha];
    try {
      const result = await DB.query(query, values);
      console.log(result);
      return result;
    } catch (e) {
      console.error("Error al obtener la lista de pedidos:", e);
      throw e;
    }
}


  static async nuevoPedido(pedido: parametrosPedido): Promise<boolean> {
    const query = `
    INSERT INTO pedidos (nombre, apellido_1, apellido_2, nif, email, telefono_1, telefono_2, direccion, localidad, provincia, codpos, canal, id_agente, id_tienda, telefono_tienda, email_tienda, tipo_instalacion, oferta, comentarios)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const values = [
      pedido.nombre, pedido.apellido_1, pedido.apellido_2, pedido.nif, pedido.email, pedido.telefono_1, pedido.telefono_2, 
      pedido.direccion, pedido.localidad, pedido.provincia, pedido.codpos, pedido.canal, pedido.id_agente,
      pedido.id_tienda, pedido.telefono_tienda, pedido.email_tienda, pedido.tipo_instalacion, pedido.oferta, pedido.comentarios
    ];
    try {
      var result = await DB.query(query, values);
      return result > 0;
    } catch (e) {
      console.error("Error en nuevo pedido:", e);
      throw e;  
    }
  }
}
