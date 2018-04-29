import { Component, OnInit, Input } from '@angular/core';
import { LocationModel } from '../locationModel';
import { LocationService } from '../locationService';
import { ConfirmationService, Messages } from 'primeng/primeng';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ComponentVisibiltyModel } from '../componentVisibiltyModel';
import { SubCategoryModel } from '../subcategoryModel';


@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css'],
  providers: [ConfirmationService]
})
export class SubcategoryComponent implements OnInit {
  subcategory: LocationModel;
  @Input() subcategorys: LocationModel[];
  @Input() locationid: string;
  @Input() departmentid: string;
  @Input() categoryid: string;
  @Input() flagModel: ComponentVisibiltyModel;

  selectionSubCategory: LocationModel;
  displayDialog: boolean;
  newSubCategory: boolean;
  constructor(private locationService: LocationService, private confirmationService: ConfirmationService) {

  }

  ngOnInit() {

    this.getAllSubCategory();

  }

  getAllSubCategory() {
    this.locationService.service(this.locationid, this.departmentid, this.categoryid).then(result => this.subcategorys = <SubCategoryModel[]>result);
  }
  createUpdateSubCategory() {

    if (this.newSubCategory) {

      this.locationService.postService(this.subcategory, this.locationid, this.departmentid, this.categoryid).then(data => {

        let subcategorys = [...this.subcategorys];
        subcategorys.push(<SubCategoryModel>data);
        this.subcategorys = subcategorys;
      }
      );

    }
    else {

      this.locationService.putService(this.subcategory, this.locationid, this.departmentid, this.categoryid).then(data => {

        this.getAllSubCategory();
      });

    }

    this.subcategory = null;
    this.displayDialog = false;

  }

  showDialogToDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.locationService.deleteService(this.locationid, this.departmentid, this.categoryid + '', this.subcategory.id + '').then(data => {
          this.getAllSubCategory();
        }

        );
        this.subcategory = null;
        this.displayDialog = false;

      },
      reject: () => {
        this.displayDialog = false;
      }
    });
  }

  showDialogToAdd() {
    this.newSubCategory = true;
    this.subcategory = new SubCategoryModel(null, null);
    this.displayDialog = true;
  }

  showDialogToEdit() {
    this.newSubCategory = false;
    this.displayDialog = true;

  }

  onRowSelect(event) {
    this.newSubCategory = false;
    this.subcategory = this.cloneSubCategory(event.data);
    this.displayDialog = false;
  }

  cloneSubCategory(c: LocationModel): LocationModel {
    let subcategory = new LocationModel(null, null);
    for (let prop in c) {
      subcategory[prop] = c[prop];
    }
    return subcategory;
  }
  

}
