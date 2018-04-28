import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentComponent } from './department.component';

import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule, TreeModule, DialogModule, ButtonModule, InputTextModule, ConfirmDialogModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from '../category/category.component';
import { LocationService } from '../locationService';
import { SubcategoryComponent } from '../subcategory/subcategory.component';

describe('DepartmentComponent', () => {
  let component: DepartmentComponent;
  let fixture: ComponentFixture<DepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentComponent ,CategoryComponent,SubcategoryComponent],
      imports: [BrowserModule,
        DataTableModule,
        FormsModule,
        
        HttpModule,
        
        TreeModule,
        DialogModule,
        ButtonModule,
        InputTextModule,

        BrowserAnimationsModule,
        ConfirmDialogModule,
        HttpClientModule],
        providers: [LocationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
