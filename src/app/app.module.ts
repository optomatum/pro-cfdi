import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ContainerComponent} from './container/container.component';
import {PathSelectorComponent} from './container/files-loader/path-selector/path-selector.component';
import {FileBrowserComponent} from './container/files-loader/file-browser/file-browser.component';
import {ReaderService} from './shared/services/reader.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileDetailComponent} from './container/files-loader/file-browser/file-detail/file-detail.component';


import {AgGridModule} from 'ag-grid-angular';
import {SidebarComponent} from './container/sidebar/sidebar.component';
import {HeaderComponent} from './container/header/header.component';
import {FilesLoaderComponent} from './container/files-loader/files-loader.component';
import {ClienteComponent} from './container/cliente/cliente.component';
import {ClienteListComponent} from './container/cliente/cliente-list/cliente-list.component';
import {ClienteEditComponent} from './container/cliente/cliente-edit/cliente-edit.component';
import {ClienteAddComponent} from './container/cliente/cliente-add/cliente-add.component';
import {ClienteItemComponent} from './container/cliente/cliente-list/cliente-item/cliente-item.component';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
/*import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatGridListModule, MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule, MatToolbarModule
} from '@angular/material';*/
import {AppRoutingModule} from './app-routing.module';
import {ClienteService} from './shared/services/cliente.service';

import {ClienteSelectComponent} from './container/cliente/cliente-select/cliente-select.component';

import {CfdiComponent} from './container/cfdi/cfdi/cfdi.component';
import {CfdiService} from './shared/services/cfdi.service';
import {CfdiProcessorComponent} from './container/cfdi/cfdi-processor/cfdi-processor.component';
import {CfdiViewComponent} from './container/cfdi/cfdi-view/cfdi-view.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import {FileExplorerComponent} from './file-explorer/file-explorer.component';
import {FileService} from './shared/services/file.service';
import {NgxElectronModule} from 'ngx-electron';
import {FileSystemService} from './shared/services/file-system.service';
import {FilesModule} from './container/files-loader/files.module';
import 'ag-grid-enterprise';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CfdiParametersComponent} from './container/cfdi/cfdi-parameters/cfdi-parameters.component';
import {EmisorSelectorComponent} from './container/cfdi/cfdi-parameters/emisor-selector/emisor-selector.component';
import {ReceptorSelectorComponent} from './container/cfdi/cfdi-parameters/receptor-selector/receptor-selector.component';
import {DateRangeComponent} from './container/cfdi/cfdi-parameters/date-range/date-range.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    PathSelectorComponent,
    FileBrowserComponent,
    FileDetailComponent,
    CfdiViewComponent,
    SidebarComponent,
    HeaderComponent,
    FilesLoaderComponent,
    ClienteComponent,
    ClienteListComponent,
    ClienteEditComponent,
    ClienteAddComponent,
    ClienteItemComponent,
    CfdiProcessorComponent,
    ClienteSelectComponent,
    CfdiComponent,
    FileExplorerComponent,
    CfdiParametersComponent,
    EmisorSelectorComponent,
    ReceptorSelectorComponent,
    DateRangeComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,

    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatToolbarModule,
    NgxElectronModule,
    FilesModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule

  ],
  providers: [ReaderService, ClienteService, CfdiService, FileService, FileSystemService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
