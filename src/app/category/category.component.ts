import { Component, OnInit, Input } from '@angular/core';
import { CategoryModel } from '../categoryModel';
import { LocationService } from '../locationService';
import { ConfirmationService, Messages } from 'primeng/primeng';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { LocationModel } from '../locationModel';
import { SubCategoryModel } from '../subcategoryModel';
import { ComponentVisibiltyModel } from '../componentVisibiltyModel';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers:[ConfirmationService]
})
export class CategoryComponent implements OnInit {
  category:CategoryModel;
  msgs: Message[];
  @Input() categorys:CategoryModel[];
  @Input() locationid:string;
  @Input() departmentid:string;
  @Input() flagModel:ComponentVisibiltyModel;
  selectionCategory:CategoryModel;
  subcategory:SubCategoryModel[];
  displayDialog:boolean;
  newCategory:boolean;
  displayDept:boolean;
  constructor(private locationService:LocationService,private confirmationService:ConfirmationService) {
    
   }

  ngOnInit() {
 
  this.locationService.service(this.locationid,this.departmentid,null).then(result=>this.fetchCategory(result)); 
   
  }
  fetchCategory(result){
    this.categorys=result;
   // console.log(this.category);
  }
  
  showDialogToAdd()
  {
    this.newCategory = true;
    this.category = new CategoryModel(null,null);
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.newCategory = false;

    //console.log(event.data);
    this.category = this.cloneCategory(event.data);
    this.displayDialog = false;
    this.locationService.service(this.locationid,this.departmentid,this.category.id+'').then(result=>this.fetchSubCategory(result)); 
    this.flagModel=new ComponentVisibiltyModel(true,true,true,true);
 
}
 
fetchSubCategory(result){
  this.subcategory=result;
   console.log(this.subcategory);
}
showDialogToDelete()
{
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'fa fa-trash',
    accept: () => {
      this.locationService.deleteService(this.locationid,this.departmentid,this.category.id+'',null); 
      
      this.displayDialog = false;
      this.ngOnInit();
    },
    reject: () => {
      this.displayDialog = false;
    }
});
}

cloneCategory(c: CategoryModel): CategoryModel {
  let category = new CategoryModel(null,null);
  for(let prop in c) {
    category[prop] = c[prop];
  }
  return category;
}
showDialogToEdit(){
    this.newCategory = true;
    this.displayDialog = true;

  }
  save() {
    //let categorys = [...this.categorys];
    if(this.newCategory){
      //console.log(this.category);
        //categorys.push(this.category);
        this.locationService.postService(this.category,this.locationid,this.departmentid,null);
      //console.log("Adding");
    }
    else{
       // categorys[this.findSelectedCarIndex()] = this.category;
      this.locationService.putService(this.category,this.locationid,null,null);
     //console.log("Updating");
  }
   // this.categorys = categorys;
   
    this.displayDialog = false;
    this.ngOnInit();
}

}
