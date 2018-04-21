import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class LocationService implements OnInit {

  apiRoot:string='http://localhost:8080/location/';
  results:Object[];
  loading:boolean;

  constructor(private http) { 
    this.results = [];
    this.loading = false;
  }

  ngOnInit(){

  }

  service(location: String, department: String, category: String){
    let apiUrl:String='';
    if(location && department && category ){
      apiUrl=this.apiRoot+location+'/department/'+department+'/category/'+category+'/subcategory';
    } else if(location && department){
      apiUrl=this.apiRoot+location+'/department/'+department+'/category';
    }else if(location){
      apiUrl=this.apiRoot+location+'/department';
    }else{
      apiUrl=this.apiRoot+location;
    }

    let promise = new Promise((resolve, reject) => {
        this.http.get(apiUrl)
        .toPromise()
        .then(
          res => { // Success
            console.log(res.json());
            resolve();
          }
        );
    });
    return promise;

  }

}