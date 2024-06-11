import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPedidoComponent } from './formulario-pedido.component';

describe('FormularioPedidoComponent', () => {
  let component: FormularioPedidoComponent;
  let fixture: ComponentFixture<FormularioPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioPedidoComponent]
    });
    fixture = TestBed.createComponent(FormularioPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
