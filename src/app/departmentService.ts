import { Injectable, OnInit } from "@angular/core";
import { Http, Response } from '@angular/http';
import { TreeNode } from 'primeng/primeng';
import { Observable } from "rxjs/Observable";
import { DepartmentModel } from "./departmentModel";

@Injectable()
export class DepartmentService implements OnInit {

  apiRoot:string='http://localhost:8080/location/';
  results:Object[];
  loading:boolean;

  constructor(private http:Http) { 
    this.results = [];
    this.loading = false;
  }

  ngOnInit(){

  }
  postService(value:DepartmentModel, location: String, department: String, category: String)
  {
    let apiUrl=this.apiUrl(location,department,category,false);

    
    let promise = new Promise((resolve, reject) => {
      this.http.post(apiUrl,value)
       .toPromise()
       .then(
         
         res =>{
          
          //console.log(res.json());          
          
          resolve(res.json());
           
         }
      );
   });
   
   return promise;

  }

  putService(value:DepartmentModel, location: String, department: String, category: String)
  {
    let apiUrl=this.apiUrl(location,department,category,false);

    
    let promise = new Promise((resolve, reject) => {
      this.http.put(apiUrl,value)
       .toPromise()
       .then(
         
         res =>{
          
          //console.log(res.json());          
          
          resolve(res.json());
           
         }
      );
   });
   
   return promise;

  }

  deleteService(location: String, department: String, category: String)
  {
    let apiUrl=this.apiUrl(location,department,category,true);

    
    let promise = new Promise((resolve, reject) => {
      this.http.delete(apiUrl)
       .toPromise()
       .then(
         
         res =>{
          
          //console.log(res.json());          
          
          resolve(res);
           
         }
      );
   });
   
   return promise;

  }
  apiUrl(location: String, department: String, category: String,deleteFlag:boolean){

    let apiUrl:string='';
    let results:TreeNode[];
    if(location && department && category ){
      apiUrl=deleteFlag?this.apiRoot+location+'/department/'+department+'/category/'+category:this.apiRoot+location+'/department/'+department+'/category/'+category+'/subcategory';
      // console.log("apiUrl 1");
    } else if(location && department){
      apiUrl=deleteFlag?this.apiRoot+location+'/department/'+department:this.apiRoot+location+'/department/'+department+'/category';
      // console.log("apiUrl 2");
    }else if(location){
      apiUrl=deleteFlag?this.apiRoot+location:this.apiRoot+location+'/department';
      // console.log("apiUrl 3");
    }else{
      apiUrl=this.apiRoot;
      console.log(apiUrl);
    }
    return apiUrl;
  }
  service(location: String, department: String, category: String){
    //console.log(location);
    let apiUrl=this.apiUrl(location,department,category,false);

    // return this.http.get('http://localhost:8080/location/')
    //                 .toPromise()
    //                 .then(res =>  res.json().data);
    
    let promise = new Promise((resolve, reject) => {
      this.http.get(apiUrl)
       .toPromise()
       .then(
         
         res =>{
          
          //console.log(res.json());          
          
          resolve(res.json());
           
         }
      );
   });
   
   return promise;
   
  
  }

}