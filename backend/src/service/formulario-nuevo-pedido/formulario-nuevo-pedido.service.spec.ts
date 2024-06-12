import { TestBed } from '@angular/core/testing';

import { FormularioNuevoPedidoService } from './formulario-nuevo-pedido.service';

describe('FormularioNuevoPedidoService', () => {
  let service: FormularioNuevoPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioNuevoPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
