import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DepartmentModel } from '../departmentModel';
import { LocationService } from '../locationService';
import { ConfirmationService, Messages } from 'primeng/primeng';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { LocationModel } from '../locationModel';
import { CategoryModel } from '../categoryModel';
import { ComponentVisibiltyModel } from '../componentVisibiltyModel';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers:[ConfirmationService]
})
export class DepartmentComponent implements OnInit,AfterViewInit {
  department:DepartmentModel;
  msgs: Message[];
  @Input() departments:DepartmentModel[];
  @Input() locationid:string;
  @Input() flagModel:ComponentVisibiltyModel;
 // @Input() departmentid:string;
  selectionDepartment:DepartmentModel;
  category:CategoryModel[];
  displayDialog:boolean;
  newDepartment:boolean;
  displayDept:boolean;
  constructor(private locationService:LocationService,private confirmationService:ConfirmationService) {
    // console.log("Cons")
   }

  ngOnInit() {
   console.log("loading");
  this.locationService.service(this.locationid+'',null,null).then(result=>this.fetchDepartment(result)); 
   
  }

  ngAfterViewInit(){
  this.fetchCategory(null);
}

  fetchDepartment(result){
    this.departments=result;
   // console.log(this.department);
  }
  
  showDialogToAdd()
  {
    this.newDepartment = true;
    this.department = new DepartmentModel(null,null);
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.newDepartment = false;

    // console.log(event.data);
    this.department = this.cloneDepartment(event.data);
    this.displayDialog = false;

    this.locationService.service(this.locationid+'',this.department.id+'',null).then(result=>this.fetchCategory(result)); 
    this.flagModel=new ComponentVisibiltyModel(true,true,true,false);
}

fetchCategory(result){
  this.category=result;
   //console.log(this.category);
}
showDialogToDelete()
{
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'fa fa-trash',
    accept: () => {
      this.locationService.deleteService(this.locationid,this.department.id+'',null,null); 
      // this.department=null;
      this.displayDialog = false;
      this.ngOnInit();
    },
    reject: () => {
      this.displayDialog = false;
    }
});
}

cloneDepartment(c: DepartmentModel): DepartmentModel {
  let department = new DepartmentModel(null,null);
  for(let prop in c) {
    department[prop] = c[prop];
  }
  return department;
}
showDialogToEdit(){
    this.newDepartment = true;
    this.displayDialog = true;

  }
  save() {
    //let departments = [...this.departments];
    if(this.newDepartment){
      // console.log(this.department);
        //departments.push(this.department);
        this.locationService.postService(this.department,this.locationid,null,null);
      // console.log("Adding");
    }
    else{
       // departments[this.findSelectedCarIndex()] = this.department;
      this.locationService.putService(this.department,this.locationid,null,null);
    //  console.log("Updating");
  }
   // this.departments = departments;
    //this.department = null;
    this.displayDialog = false;
    this.ngOnInit();
}

}
