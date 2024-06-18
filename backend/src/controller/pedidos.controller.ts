import { Request, Response } from "express";
import { GenericResponse } from "../interfaces/GenericResponse";
import { FormularioPedidoService } from "../service/formulario-nuevo-pedido/formulario-nuevo-pedido.service";
import { parametrosPedido } from "../interfaces/formulario-pedido";
export default class PedidosController {

    static getListaPedidos = async (req: Request, res: Response) => {
        let response: GenericResponse = {
            code: 200,
            message: "Pedido creado correctamente.",
            data: {}
        };
        try {
            const eventos = await FormularioPedidoService.getListaPedidos(req.query.dateTime as any);
            response.data = { eventos };
            response.code = 200;
        } catch (e) {
            console.log(e as string);
            response.message = e as string;
            response.code = 500;
        }
        res.json(response);
    }

    static newPedido = async (req: Request, res: Response) => {
        let response: GenericResponse = {
            code: 200,
            message: "Pedido creado correctamente.",
            data: {}
        };
        try {
            const eventos = await FormularioPedidoService.nuevoPedido(req.body as any);
            response.data = { eventos };
            response.code = 200;
        } catch (e) {
            console.log(e as string);
            response.message = e as string;
            response.code = 500;
        }
        res.json(response);
    }
}
