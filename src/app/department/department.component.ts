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
  providers: [ConfirmationService]
})
export class DepartmentComponent implements OnInit {
  department: DepartmentModel;
  @Input() departments: DepartmentModel[];
  @Input() locationid: string;
  @Input() flagModel: ComponentVisibiltyModel;
  selectionDepartment: DepartmentModel;
  category: CategoryModel[];
  displayDialog: boolean;
  newDepartment: boolean;
  constructor(private locationService: LocationService, private confirmationService: ConfirmationService) {

  }

  ngOnInit() {

    this.getAllDepartment();

  }

  getAllDepartment() {
    this.locationService.service(this.locationid + '', null, null).then(result => this.departments = <DepartmentModel[]>result);
  }

  createUpdateDepartment() {

    if (this.newDepartment) {

      this.locationService.postService(this.department, this.locationid, null, null).then(data => {

        let departments = [...this.departments];
        departments.push(<DepartmentModel>data);
        this.departments = departments;
      }
      );

    }
    else {

      this.locationService.putService(this.department, this.locationid, null, null).then(data => {

        this.getAllDepartment();
      }
      );

    }

    this.displayDialog = false;

  }


  showDialogToDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.locationService.deleteService(this.locationid, this.department.id + '', null, null).then(data => {
          this.getAllDepartment();
        }
        );
        this.displayDialog = false;
      },
      reject: () => {
        this.displayDialog = false;
      }
    });
  }


  showDialogToAdd() {
    this.newDepartment = true;
    this.department = new DepartmentModel(null, null);
    this.displayDialog = true;
  }

  showDialogToEdit() {
    this.newDepartment = false;
    this.displayDialog = true;

  }

  onRowSelect(event) {
    this.newDepartment = false;
    this.department = this.cloneDepartment(event.data);
    this.displayDialog = false;
    this.locationService.service(this.locationid + '', this.department.id + '', null).then(result => this.category = <CategoryModel[]>result);
    this.flagModel = new ComponentVisibiltyModel(true, true, true, false);
  }

  cloneDepartment(c: DepartmentModel): DepartmentModel {
    let department = new DepartmentModel(null, null);
    for (let prop in c) {
      department[prop] = c[prop];
    }
    return department;
  }



}
