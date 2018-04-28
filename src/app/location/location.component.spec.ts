import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationComponent } from './location.component';


import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule, TreeModule, DialogModule, ButtonModule, InputTextModule, ConfirmDialogModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentComponent } from '../department/department.component';
import { LocationService } from '../locationService';
import { CategoryComponent } from '../category/category.component';
import { SubcategoryComponent } from '../subcategory/subcategory.component';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationComponent,DepartmentComponent,CategoryComponent,SubcategoryComponent ],
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
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
