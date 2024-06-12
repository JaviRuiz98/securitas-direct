import { Request, Response } from "express";
import { GenericResponse } from "../interfaces/GenericResponse";
import { FormularioPedidoService } from "../service/formulario-nuevo-pedido/formulario-nuevo-pedido.service";
import { parametrosPedido } from "../interfaces/formulario-pedido";
export default class PedidosController {

    static newPedido = async (req: Request, res: Response) => {
        console.log('entro en nuevo pedido');
        let response: GenericResponse = {
            code: 200,
            message: "Pedido creado correctamente.",
            data: {}
        };
        try {
            const eventos = await FormularioPedidoService.nuevoPedido(req.query as any);
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
