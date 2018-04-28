import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';

import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule, TreeModule, DialogModule, ButtonModule, InputTextModule, ConfirmDialogModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SubcategoryComponent } from '../subcategory/subcategory.component';
import { LocationService } from '../locationService';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryComponent ,SubcategoryComponent],
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
        HttpClientModule ],
        providers: [LocationService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
