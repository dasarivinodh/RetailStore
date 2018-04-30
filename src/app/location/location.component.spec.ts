import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';

import { LocationComponent } from './location.component';


import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule, TreeModule, DialogModule, ButtonModule, InputTextModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { DepartmentComponent } from '../department/department.component';
import { LocationService } from '../locationService';
import { CategoryComponent } from '../category/category.component';
import { SubcategoryComponent } from '../subcategory/subcategory.component';
import { LocationModel } from '../locationModel';





describe('LocationComponent', () => {

  let locationService: LocationService;
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;


  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [LocationComponent, DepartmentComponent, CategoryComponent, SubcategoryComponent],
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
      providers: [LocationService, ConfirmationService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
  it('getService apiUrl ', inject([LocationService], (locationService: LocationService) => {
    
    console.log("Arguments"+locationService.apiUrl.length);
   
        expect(locationService.apiUrl.length).toEqual(4);
  }));
 
  it('getService ', inject([LocationService], (locationService: LocationService) => {
    
    console.log("Arguments"+locationService.service);
   
        locationService.service(null,null,null).then(value=>expect(value).toBe('Should return Promise Value'));
  }));


});
