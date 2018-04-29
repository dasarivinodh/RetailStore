import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { DepartmentComponent } from './department/department.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { TreeHierarchicalComponent } from './tree-hierarchical/tree-hierarchical.component';
import { BrowserModule } from '@angular/platform-browser';
import { DataTableModule, TreeModule, DialogModule, ButtonModule, InputTextModule, ConfirmDialogModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './locationService';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LocationComponent,
        DepartmentComponent,
        CategoryComponent,
        SubcategoryComponent,
        TreeHierarchicalComponent,

      ],
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
        providers: [LocationService],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('Retail Store');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Excercise1');
  // }));
});
