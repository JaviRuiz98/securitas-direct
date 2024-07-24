import { Request, Response } from "express";
import { GenericResponse } from "../interfaces/GenericResponse";
import { FormularioPedidoService } from "../service/formulario-nuevo-pedido/formulario-nuevo-pedido.service";
import axios from "axios";

import { parametrosPedido } from "../interfaces/formulario-pedido";

const externalUrl = 'https://clcctopdigital.stg-sdalianzas.es/api/';
const ApiKey = '589eab594a2bef41c7705a2238084be57ee31f1a';
 
export default class PedidosController {

    static getListaPedidos = async (req: Request, res: Response) => {
        let response: GenericResponse = {
            code: 200,
            message: "Pedidos listados correctamente.",
            data: {}
        };
        try {
            var next_page = true;
            var page = 1;
            const pipeline_seleccioando = "Ventas Securitas Direct";
            var lista_pedidos = {
                pedidos: [] as parametrosPedido[],
                respuestas: [] as any
            }

            while(next_page){
                var llamadaApi = await axios.get("https://api.clientify.net/v1/deals/?page=" + page, {
                    headers: {
                        'Authorization': `Token ${ApiKey}`
                    }
                });  
                const filteredDeals = llamadaApi.data.results.filter((deal: any) => deal.pipeline_desc === pipeline_seleccioando);
                for (let i = 0; i < filteredDeals.length; i++) {
                    console.log('filteredDeals[i]', filteredDeals[i])
                    const idClienteByURL = filteredDeals[i].contact.match(/\/contacts-dynamic\/(\d+)\//);
                    const id_cliente = idClienteByURL ? idClienteByURL[1] : null;
                    const idCompanyByURL = filteredDeals[i].company.match(/\/companies\/(\d+)\//);
                    const id_company = idCompanyByURL ? idCompanyByURL[1] : null;
                    
                    const addresses = await PedidosController.llamadaApi(`https://api.clientify.net/v1/contacts/${id_cliente}/addresses/`, ApiKey);
                    const phones = await PedidosController.llamadaApi(`https://api.clientify.net/v1/contacts/${id_cliente}/phones/`, ApiKey);
                    
                    var pedidos_parametrizados = PedidosController.getParametrosPedido(filteredDeals[i], addresses.data.results, phones.data.results);
                    console.log('pedidos parametrzados', pedidos_parametrizados)
                    for (let j = 0; j < pedidos_parametrizados.length; j++) {
                        // if(lista_pedidos.pedidos.length > 0){
                        //     const pedido_encontrado = lista_pedidos.pedidos.findIndex((pedido: any) => pedido.id_pedido === pedidos_parametrizados[j].id_pedido.toString());
                        //     if(pedido_encontrado === -1){
                        //         var almacenar_pedido = await axios.post(externalUrl+"v1/pedidos/almacenar", pedidos_parametrizados[j]);
                        //         lista_pedidos.pedidos.push(pedidos_parametrizados[j]);
                        //         lista_pedidos.respuestas.push(almacenar_pedido);
                        //     }else if(pedido_encontrado !== -1 && lista_pedidos.respuestas[pedido_encontrado].success === false){
                        //         var almacenar_pedido = await axios.post(externalUrl+"v1/pedidos/almacenar", pedidos_parametrizados[j]);
                        //         lista_pedidos.respuestas[pedido_encontrado] = almacenar_pedido;
                        //     }
                        // }else {
                        //     var almacenar_pedido = await axios.post(externalUrl+"v1/pedidos/almacenar", pedidos_parametrizados[j]);
                        //     lista_pedidos.pedidos.push(pedidos_parametrizados[j]);
                        //     lista_pedidos.respuestas.push(almacenar_pedido);
                        // }
                    }
                }
                if(llamadaApi.data.next === null){
                    next_page = false;
                } else{
                    page += 1;
                }
            }

            console.log('fin de bucle')
    
            response.code = 200;
        } catch (e) {
            console.log(e as string);
            response.message = e as string;
            response.code = 500;
        }
        res.json(response);
    }

    public static getParametrosPedido(parametros: any, addresses: any, phones: any): parametrosPedido[] {
        const idClienteByURL = parametros.contact.match(/\/contacts-dynamic\/(\d+)\//);
        const id_cliente = idClienteByURL ? idClienteByURL[1] : null;
        var pedidos: parametrosPedido[] = [];
        for (let i = 0; i < addresses.length; i++) {
            const pedido: parametrosPedido = {
                id_pedido: parametros.id.toString() || '',
                id_cliente: id_cliente || '',
                nombre: parametros.contact_name.split(' ')[0] || '',
                apellido_1: parametros.contact_name.split(' ')[1] || '',
                apellido_2: parametros.contact_name.split(' ')[2] || '',
                nif: null,  
                email: parametros.contact_email || '',
                telefono_1: phones[0] ? phones[0].phone : '',
                telefono_2: phones[1] ? phones[1].phone : '',  
                direccion: addresses[i].street || '',  
                localidad: addresses[i].city || '',
                provincia: addresses[i].state || '',
                codpos: addresses[i].postal_code || '',  
                canal: parametros.contact_medium || '',
                id_agente: '0',  
                id_tienda: '0',  
                telefono_tienda: '',
                email_tienda: '',
                tipo_instalacion: '',  
                oferta: '',  
                comentarios: '' 
            };
            pedidos.push(pedido);
        }
        return pedidos;
    }
    public static llamadaApi = async (apiUrl: string, ApiKey: string) => {
        const llamadaApi = await axios.get(apiUrl, {
            headers: {
                'Authorization': `Token ${ApiKey}`
            }
        });
        return llamadaApi;
    }






    static getListaPedidosByDate = async (req: Request, res: Response) => {
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
                id_pedido:'12349',
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

    static almacenarPedidos = async (req: Request, res: Response) => {
        let response: GenericResponse = {
            code: 200,
            message: "Pedidos almacenados correctamente.",
            data: {}
        };
        try {
            const llamadaApi = await axios.post(externalUrl+"v1/pedidos/almacenar", req.body);
            console.log('respuesta:', llamadaApi)
            res.json({ code: 200, message: "Response sent to external URL successfully." });
        } catch (error) {
            console.log(error as string);
            res.json({ code: 500, message: "Failed to send response to external URL." });
        } 
    }
}
