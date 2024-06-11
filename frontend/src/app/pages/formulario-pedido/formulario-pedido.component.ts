import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-pedido',
  templateUrl: './formulario-pedido.component.html',
  styleUrls: ['./formulario-pedido.component.css'],
})
export class FormularioPedidoComponent implements OnInit {
  datos_pedido!: FormGroup;
  isButtonDisabled: boolean = true;

  constructor() {}

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
    this.inicializarFormulario();
  }
}
