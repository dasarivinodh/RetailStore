import { Component, OnInit, Input } from '@angular/core';
import { CategoryModel } from '../categoryModel';
import { LocationService } from '../locationService';
import { ConfirmationService, Messages } from 'primeng/primeng';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { SubCategoryModel } from '../subcategoryModel';
import { ComponentVisibiltyModel } from '../componentVisibiltyModel';
import { DepartmentModel } from '../departmentModel';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [ConfirmationService]
})
export class CategoryComponent implements OnInit {
  category: CategoryModel;
  @Input() categorys: CategoryModel[];
  @Input() locationid: string;
  @Input() departmentid: string;
  @Input() flagModel: ComponentVisibiltyModel;
  selectionCategory: CategoryModel;
  subcategory: SubCategoryModel[];
  displayDialog: boolean;
  newCategory: boolean;
  constructor(private locationService: LocationService, private confirmationService: ConfirmationService) {

  }
  
  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.locationService.service(this.locationid, this.departmentid, null).then(result => this.categorys = <CategoryModel[]>result);
  }
  
  createUpdateCategory() {

    if (this.newCategory) {
      this.locationService.postService(this.category, this.locationid, this.departmentid, null).then(data => {
        let categorys = [...this.categorys];
        categorys.push(<CategoryModel>data);
        this.categorys = categorys;
      }
      );

    }
    else {

      this.locationService.putService(this.category, this.locationid, this.departmentid, null).then(data => {
        this.getAllCategory();
      });
    }
    this.displayDialog = false;
  }

  showDialogToDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.locationService.deleteService(this.locationid, this.departmentid, this.category.id + '', null).then(data => {
          this.getAllCategory();
        });

        this.displayDialog = false;

      },
      reject: () => {
        this.displayDialog = false;
      }
    });
  }

  cloneCategory(c: CategoryModel): CategoryModel {
    let category = new CategoryModel(null, null);
    for (let prop in c) {
      category[prop] = c[prop];
    }
    return category;
  }
  showDialogToEdit() {
    this.newCategory = false;
    this.displayDialog = true;

  }
  showDialogToAdd() {
    this.newCategory = true;
    this.category = new CategoryModel(null, null);
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.newCategory = false;
    this.category = this.cloneCategory(event.data);
    this.displayDialog = false;
    this.locationService.service(this.locationid, this.departmentid, this.category.id + '').then(result => this.subcategory = <SubCategoryModel[]>result);
    this.flagModel = new ComponentVisibiltyModel(true, true, true, true);

  }


}
