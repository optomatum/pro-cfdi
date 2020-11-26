import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClienteComponent} from './container/cliente/cliente.component';
import {FilesLoaderComponent} from './container/files-loader/files-loader.component';
import {CfdiComponent} from "./container/cfdi/cfdi/cfdi.component";


const routes: Routes = [
  {
    path: 'clientes',
    component: ClienteComponent,
  }, {
    path: 'files-loader',
    component: FilesLoaderComponent,
  },

  {
    path: 'cfdi-processor',
    component: CfdiComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
