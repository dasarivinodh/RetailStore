import { Injectable, OnInit } from "@angular/core";
import { Http, Response, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { TreeNode } from 'primeng/primeng';
import { Observable } from "rxjs/Observable";
import { LocationModel } from "./locationModel";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LocationService implements OnInit {

  apiRoot: string = 'http://localhost:8080/location/';

  loading: boolean;


  constructor(private http: HttpClient) {

    this.loading = false;
  }

  ngOnInit() {

  }

  //get Service
  service(location: String, department: String, category: String) {

    let apiUrl = this.apiUrl(location, department, category, false);
    let promise = new Promise((resolve, reject) => {
      this.http.get(apiUrl)
        .toPromise()
        .then(

          res => {
            resolve(res);

          }
        );
    });

    return promise;
  }
  postService(value: LocationModel, location: String, department: String, category: String) {
    let apiUrl = this.apiUrl(location, department, category, false);


    let promise = new Promise((resolve, reject) => {
      this.http.post(apiUrl, value)
        .toPromise()
        .then(

          res => {

            resolve(res);
          }
        );
    });

    return promise;

  }

  putService(value: LocationModel, location: String, department: String, category: String) {
    let apiUrl = this.apiUrl(location, department, category, false);
    let promise = new Promise((resolve, reject) => {
      this.http.put(apiUrl, value)
        .toPromise()
        .then(

          res => {

            resolve(res);

          }
        );
    });

    return promise;

  }

  deleteService(location: String, department: String, category: String, subcategory: String) {
    let apiUrl = this.apiUrl(location, department, category, true);

    if (subcategory) {
      apiUrl += "/subcategory/" + subcategory;
    }
    let promise = new Promise((resolve, reject) => {
      this.http.delete(apiUrl)
        .toPromise()
        .then(

          res => {
            resolve(res);
          }
        );
    });

    return promise;

  }

 
 // Forming API URL 
  apiUrl(location: String, department: String, category: String, deleteFlag: boolean) {

    let apiUrl: string = '';

    if (location && department && category) {
      apiUrl = deleteFlag ? this.apiRoot + location + '/department/' + department + '/category/' + category : this.apiRoot + location + '/department/' + department + '/category/' + category + '/subcategory';

    } else if (location && department) {
      apiUrl = deleteFlag ? this.apiRoot + location + '/department/' + department : this.apiRoot + location + '/department/' + department + '/category';

    } else if (location) {
      apiUrl = deleteFlag ? this.apiRoot + location : this.apiRoot + location + '/department';

    } else {
      apiUrl = this.apiRoot;

    }
    return apiUrl;
  }

}