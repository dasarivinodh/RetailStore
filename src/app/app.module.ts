import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';


import { LocationService } from './locationService';
import { AppComponent } from './app.component';
import { DataTableModule, TreeModule, DialogModule, ButtonModule, InputTextModule, ConfirmDialogModule } from 'primeng/primeng';

import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TreeHierarchicalComponent } from './tree-hierarchical/tree-hierarchical.component';
import { LocationComponent } from './location/location.component';
import { DepartmentComponent } from './department/department.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './app.config';



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
    HttpClientModule
  ],
  providers: [
    LocationService,
    AppConfig,
    { 
      provide: APP_INITIALIZER, 
      useFactory: (config: AppConfig) => () => config.load(), 
      deps: [AppConfig], 
      multi: true 
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
