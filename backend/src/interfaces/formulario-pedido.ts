export interface parametrosPedido {
  id: number;
  id_cliente: number;
  nombre: string | null;
  apellido_1: string | null;
  apellido_2: string | null;
  nif: string | null;
  email: string | null;
  telefono_1: string | null;
  telefono_2: string | null;
  direccion: string | null;
  localidad: string | null;
  provincia: string | null;
  codpos: string | null;
  canal: string | null;
  id_agente: string | null;
  id_tienda: string | null;
  telefono_tienda: string | null;
  email_tienda: string | null;
  tipo_instalacion: string | null;
  oferta: string | null;
  comentarios: string | null;
}
export interface listaPedidos {
  id_cliente: string;
  id_pedido: string;
  id_integracion: number;
  id_clcc: number;
  id_llamada: number;
  estado: string;
  resultado: string;
  ts_estado: Date;
}
