import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationModel } from '../locationModel';
import { LocationService } from '../locationService';
import { ConfirmationService, Messages } from 'primeng/primeng';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { DepartmentModel } from '../departmentModel';
import { ComponentVisibiltyModel } from '../componentVisibiltyModel';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers:[ConfirmationService]
})
export class LocationComponent implements OnInit {
  msgs: Message[];
  locations:LocationModel[];
  selectionLocation:LocationModel;
  location:LocationModel ;
  displayDialog:boolean;
  newLocation:boolean;
  department: DepartmentModel[];
  displayDept:boolean;
  flagModel:ComponentVisibiltyModel;
 
  constructor(private locationService:LocationService,private confirmationService:ConfirmationService) {

   }

  ngOnInit() {
    this.displayDept = false;
    this.locationService.service(null,null,null).then(result=>this.locations=<LocationModel[]>result); 
    this.flagModel=new ComponentVisibiltyModel(true,false,false,false);

  }
  fetchLocation(result)
  {
    this.locations=result;
   //console.log(this.locations);
  }
  showDialogToAdd()
  {
    this.newLocation = true;
    this.location = new LocationModel(null,null);
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.newLocation = false;
    // console.log(event.data);
    this.location = this.cloneLocation(event.data);
    
    this.displayDept = true;
    this.displayDialog = false;
    this.locationService.service(this.location.id+'',null,null).then(result=>this.fetchDepartment(result)); 
    this.flagModel=new ComponentVisibiltyModel(true,true,false,false);
   
}

fetchDepartment(result){
  this.department=result;
 // console.log(this.department);
}
showDialogToDelete()
{
  this.confirmationService.confirm({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'fa fa-trash',
    accept: () => {
      this.locationService.deleteService(this.location.id+'',null,null,null).then(data=>{
        this.locationService.service(null,null,null).then(result=>this.locations=<LocationModel[]>result); 
      }
      ); 
    
      this.displayDialog = false;
     
    },
    reject: () => {
      this.displayDialog = false;
    }
});
}

cloneLocation(c: LocationModel): LocationModel {
  let location = new LocationModel(null,null);
  for(let prop in c) {
    location[prop] = c[prop];
  }
  return location;
}
showDialogToEdit(){
    this.newLocation = false;
    this.displayDialog = true;

  }
  save() {
    
    if(this.newLocation)
    {
        this.locationService.postService(this.location,null,null,null).then(data=>{

          let locations = [...this.locations];
             locations.push(<LocationModel>data);
             this.locations=locations;
            }
        );
    }
    else
    {
         this.locationService.putService(this.location,null,null,null).then(data=>{

         
          this.locationService.service(null,null,null).then(result=>this.locations=<LocationModel[]>result); 
            }
        );
   
     }
  
    this.displayDialog = false; 
   
}

}
