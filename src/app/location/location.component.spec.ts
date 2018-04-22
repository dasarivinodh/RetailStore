import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from '../departmentModel';
import { LocationService } from '../locationService';
import { ConfirmationService, Messages } from 'primeng/primeng';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers:[ConfirmationService]
})
export class DepartmentComponent implements OnInit {
  msgs: Message[];
  departments:DepartmentModel[];
  selectionDepartment:DepartmentModel;
  department:DepartmentModel ;
  displayDialog:boolean;
  newDepartment:boolean;
  constructor(private locationService:LocationService,private confirmationService:ConfirmationService) {

   }

  ngOnInit() {
    this.locationService.service(null,null,null).then(result=>this.fetchDepartment(result )); 
  }
  fetchDepartment(result)
  {
    this.departments=result;
  }
  showDialogToAdd()
  {
    this.newDepartment = true;
    this.department = new DepartmentModel(null,null);
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.newDepartment = false;
    console.log(event.data);
    this.department = this.cloneDepartment(event.data);
    this.displayDialog = false;
}
showDialogToDelete()
{
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'fa fa-trash',
    accept: () => {
      this.locationService.deleteService(this.department,this.department.id+'',null,null); 
      this.department=null;
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
      console.log(this.department);
        //departments.push(this.department);
        this.locationService.postService(this.department,null,null,null);
      console.log("Adding");
    }
    else{
       // departments[this.findSelectedCarIndex()] = this.department;
      this.locationService.putService(this.department,null,null,null);
     console.log("Updating");
  }
   // this.departments = departments;
    this.department = null;
    this.displayDialog = false;
    this.ngOnInit();
}

}
