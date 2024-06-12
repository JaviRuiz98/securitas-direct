import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { parametrosPedido } from 'src/app/interfaces/formulario-pedido';

import { FormularioNuevoPedidoService } from 'src/app/service/formulario-nuevo-pedido/formulario-nuevo-pedido.service';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrls: ['./formulario-pedido.component.css'],
})
export class FormularioPedidoComponent implements OnInit {

  datos_pedido!: FormGroup;
  parametros_pedido: parametrosPedido = {} as parametrosPedido;
  isButtonDisabled: boolean = true;

  constructor(private FormularioNuevoPedidoService: FormularioNuevoPedidoService) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.datos_pedido = new FormGroup({
      nombre: new FormControl<string | null>(null, [Validators.required]),
      apellido_1: new FormControl<string | null>(null, [Validators.required]),
      apellido_2: new FormControl<string | null>(null, [Validators.required]),
      nif: new FormControl<string | null>(null, [Validators.required]),
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      telefono_1: new FormControl<string | null>(null, [Validators.required]),
      telefono_2: new FormControl<string | null>(null, [Validators.required]),
      direccion: new FormControl<string | null>(null, [Validators.required]),
      localidad: new FormControl<string | null>(null, [Validators.required]),
      provincia: new FormControl<string | null>(null, [Validators.required]),
      codpos: new FormControl<string | null>(null, [Validators.required]),
      canal: new FormControl<string | null>(null, [Validators.required]),
      id_agente: new FormControl<string | null>(null, [Validators.required]),
      id_tienda: new FormControl<string | null>(null, [Validators.required]),
      telefono_tienda: new FormControl<string | null>(null, [Validators.required]),
      email_tienda: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      tipo_instalacion: new FormControl<string | null>(null, [Validators.required]),
      oferta: new FormControl<string | null>(null, [Validators.required]),
      comentarios: new FormControl<string | null>(null),
    });

    this.datos_pedido.statusChanges.subscribe(() => {
      this.updateButtonState();
    });
  }

  isFormValid(): boolean {
    const controls = this.datos_pedido.controls;
    for (const name in controls) {
      if (name !== 'comentarios' && controls[name].invalid) {
        return false;
      }
    }
    return true;
  }

  updateButtonState() {
    this.isButtonDisabled = !this.isFormValid();
  }

  enviarPedido() {
    console.log('datos', this.datos_pedido.value);
    this.asignarPedido();
    this.FormularioNuevoPedidoService.newPedido(this.parametros_pedido).subscribe((response: boolean) => {
      if (response) {
        console.log('enviado');
        this.datos_pedido.reset();
      }
    })
  }

  asignarPedido(){
    this.parametros_pedido.nombre = this.datos_pedido.get('nombre')?.value;
    this.parametros_pedido.apellido_1 = this.datos_pedido.get('apellido_1')?.value;
    this.parametros_pedido.apellido_2 = this.datos_pedido.get('apellido_2')?.value;
    this.parametros_pedido.nif = this.datos_pedido.get('nif')?.value;
    this.parametros_pedido.email = this.datos_pedido.get('email')?.value;
    this.parametros_pedido.telefono_1 = this.datos_pedido.get('telefono_1')?.value;
    this.parametros_pedido.telefono_2 = this.datos_pedido.get('telefono_2')?.value;
    this.parametros_pedido.direccion = this.datos_pedido.get('direccion')?.value;
    this.parametros_pedido.localidad = this.datos_pedido.get('localidad')?.value;
    this.parametros_pedido.provincia = this.datos_pedido.get('provincia')?.value;
    this.parametros_pedido.codpos = this.datos_pedido.get('codpos')?.value;
    this.parametros_pedido.canal = this.datos_pedido.get('canal')?.value;
    this.parametros_pedido.id_agente = this.datos_pedido.get('id_agente')?.value;
    this.parametros_pedido.id_tienda = this.datos_pedido.get('id_tienda')?.value;
    this.parametros_pedido.telefono_tienda = this.datos_pedido.get('telefono_tienda')?.value;
    this.parametros_pedido.email_tienda = this.datos_pedido.get('email_tienda')?.value;
    this.parametros_pedido.tipo_instalacion = this.datos_pedido.get('tipo_instalacion')?.value;
    this.parametros_pedido.oferta = this.datos_pedido.get('oferta')?.value;
    this.parametros_pedido.comentarios = this.datos_pedido.get('comentarios')?.value;
  }
}
