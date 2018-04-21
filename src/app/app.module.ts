import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { LocationService } from './locationService';
import { AppComponent } from './app.component';
import {DataTableModule, TreeModule} from 'primeng/primeng';
import { FormsModule } from '@angular/forms';

import { TreeHierarchicalComponent } from './tree-hierarchical/tree-hierarchical.component';


@NgModule({
  declarations: [
    AppComponent,
    TreeHierarchicalComponent,
    
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    FormsModule,
    TreeModule

  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
