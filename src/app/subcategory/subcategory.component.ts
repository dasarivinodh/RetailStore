import { Component, OnInit, Input } from '@angular/core';
import { LocationModel } from '../locationModel';
import { LocationService } from '../locationService';
import { ConfirmationService, Messages } from 'primeng/primeng';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ComponentVisibiltyModel } from '../componentVisibiltyModel';


@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css'],
  providers:[ConfirmationService]
})
export class SubcategoryComponent implements OnInit {
  subcategory:LocationModel;
  msgs: Message[];
  @Input() subcategorys:LocationModel[];
  @Input() locationid:string;
  @Input() departmentid:string;
  @Input() categoryid:string;
  @Input() flagModel:ComponentVisibiltyModel;
  
  selectionSubCategory:LocationModel;

  displayDialog:boolean;
  newSubCategory:boolean;
  displayDept:boolean;
  constructor(private locationService:LocationService,private confirmationService:ConfirmationService) {
    
   }

  ngOnInit() {
 
  this.locationService.service(this.locationid,this.departmentid,this.categoryid).then(result=>this.fetchSubCategory(result)); 
   
  }
  fetchSubCategory(result){
    this.subcategorys=result;
   // console.log(this.subcategory);
  }
  
  showDialogToAdd()
  {
    this.newSubCategory = true;
    this.subcategory = new LocationModel(null,null);
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.newSubCategory = false;

    //console.log(event.data);
    this.subcategory = this.cloneSubCategory(event.data);
    this.displayDialog = false;
}
showDialogToDelete()
{
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'fa fa-trash',
    accept: () => {
      this.locationService.deleteService(this.locationid,this.departmentid,this.categoryid+'',this.subcategory.id+''); 
      this.subcategory=null;
      this.displayDialog = false;
      this.ngOnInit();
    },
    reject: () => {
      this.displayDialog = false;
    }
});
}

cloneSubCategory(c: LocationModel): LocationModel {
  let subcategory = new LocationModel(null,null);
  for(let prop in c) {
    subcategory[prop] = c[prop];
  }
  return subcategory;
}
showDialogToEdit(){
    this.newSubCategory = true;
    this.displayDialog = true;

  }
  save() {
    //let subcategorys = [...this.subcategorys];
    if(this.newSubCategory){
      //console.log(this.subcategory);
        //subcategorys.push(this.subcategory);
        this.locationService.postService(this.subcategory,this.locationid,this.departmentid,this.categoryid);
      //console.log("Adding");
    }
    else{
       // subcategorys[this.findSelectedCarIndex()] = this.subcategory;
      this.locationService.putService(this.subcategory,this.locationid,this.departmentid,this.categoryid);
     //console.log("Updating");
  }
   // this.subcategorys = subcategorys;
    this.subcategory = null;
    this.displayDialog = false;
    this.ngOnInit();
}

}
