import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { LocationService } from './locationService';
import { AppComponent } from './app.component';
import { DataTableModule, TreeModule, DialogModule, ButtonModule, InputTextModule, ConfirmDialogModule, MenuModule } from 'primeng/primeng';
import {ContextMenuModule} from 'primeng/contextmenu';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TreeHierarchicalComponent } from './tree-hierarchical/tree-hierarchical.component';
import { LocationComponent } from './location/location.component';
import { DepartmentComponent } from './department/department.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { HttpClientModule } from '@angular/common/http';
import {MenuItem} from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    TreeHierarchicalComponent,
    LocationComponent,
    DepartmentComponent,
    CategoryComponent,
    SubcategoryComponent


  ],
  imports: [
    BrowserModule,
    DataTableModule,
    FormsModule,
    TreeModule,
    HttpModule,
    DataTableModule,
    TreeModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    HttpClientModule,
    MenuModule,
    ContextMenuModule
  ],
  providers: [LocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
