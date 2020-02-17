import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleArticuloComponent } from './components/detalle-articulo/detalle-articulo.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


const routes: Routes = [
  { path: 'home', component: SidenavComponent},
  { path: 'detalleArticulo', component: DetalleArticuloComponent},
  { path: '**', component: SidenavComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
