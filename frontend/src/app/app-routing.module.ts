import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioPedidoComponent } from './pages/formulario-pedido/formulario-pedido.component';

const routes: Routes = [
  { path: '', component: FormularioPedidoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
