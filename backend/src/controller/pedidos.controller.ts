import { Request, Response } from "express";
import { GenericResponse } from "../interfaces/GenericResponse";
import { FormularioPedidoService } from "../service/formulario-nuevo-pedido/formulario-nuevo-pedido.service";
import axios from "axios";

import { parametrosPedido } from "../interfaces/formulario-pedido";

const externalUrl = 'https://clcctopdigital.stg-sdalianzas.es/api/';

export default class PedidosController {

    static getListaPedidos = async (req: Request, res: Response) => {
        let response: GenericResponse = {
            code: 200,
            message: "Pedido creado correctamente.",
            data: {}
        };
        // try {
        //     const eventos = await FormularioPedidoService.getListaPedidos(req.query.dateTime as any);
        //     response.data = { eventos };
        //     response.code = 200;
        // } catch (e) {
        //     console.log(e as string);
        //     response.message = e as string;
        //     response.code = 500;
        // }
        try {
            const fecha = {
                ts_from: req.query.dateTime
            }
            const llamadaApi = await axios.post(externalUrl+"v1/pedidos/list", fecha);
            console.log('respuesta:', llamadaApi.data)
            res.json({ code: 200, message: "Response sent to external URL successfully." });
        } catch (error) {
            console.log(error as string);
            res.json({ code: 500, message: "Failed to send response to external URL." });
        }    
    }

    static newPedido = async (req: Request, res: Response) => {
        let response: GenericResponse = {
            code: 200,
            message: "Pedido creado correctamente.",
            data: {}
        };
        // try {
        //     const eventos = await FormularioPedidoService.nuevoPedido(req.body as any);
        //     response.data = { eventos };
        //     response.code = 200; 
        // } catch (e) {
        //     console.log(e as string);
        //     response.message = e as string;
        //     response.code = 500;
        // }
        try {
            console.log('parametros', req.body);
            const datosPedido: parametrosPedido = {
                id_pedido:'12344',
                id_cliente: '12345',
                nombre: req.body.nombre,
                apellido_1: req.body.apellido_1,
                apellido_2: req.body.apellido_2,
                nif: req.body.nif,
                email: req.body.email,
                telefono_1: req.body.telefono_1,
                telefono_2: req.body.telefono_2,
                direccion: req.body.direccion,
                localidad: req.body.localidad,
                provincia: req.body.provincia,
                codpos: req.body.codpos,
                canal: req.body.canal,
                id_agente: req.body.id_agente,
                id_tienda: req.body.id_tienda,
                telefono_tienda: req.body.telefono_tienda,
                email_tienda: req.body.email_tienda,
                tipo_instalacion: req.body.tipo_instalacion,
                oferta: req.body.oferta,
                comentarios: req.body.comentarios,
            };
            const llamadaApi = await axios.post(externalUrl+"v1/pedido", datosPedido);
            console.log('respuesta:', llamadaApi)
            res.json({ code: 200, message: "Response sent to external URL successfully." });
        } catch (error) {
            console.log(error as string);
            res.json({ code: 500, message: "Failed to send response to external URL." });
        } 
    }
}
