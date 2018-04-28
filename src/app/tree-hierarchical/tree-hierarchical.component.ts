import { Component, OnInit } from '@angular/core';
import { LocationService } from '../locationService';
import { TreeNode,TreeModule } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-tree-hierarchical',
  templateUrl: './tree-hierarchical.component.html',
  styleUrls: ['./tree-hierarchical.component.css']
})
export class TreeHierarchicalComponent implements OnInit {

  results: TreeNode[];
  locationTree:TreeNode[];
  departmentTree:TreeNode[];
  categoryTree:TreeNode[];
  subCategoryTree:TreeNode[];
  element:TreeNode;
  constructor(private locationService:LocationService) { }

  nodeSelect(value){   }

  nodeUnselect(value){  }

  ngOnInit() {
    this.locationService.service(null,null,null).then(result=>this.node1Formation(result,'CS')); 
  }

  node1Formation(node1Result,flag){
    switch(flag){
      case 'CS':
      this.locationTree=this.treeFormationValue(node1Result,flag);  
         console.log(this.locationTree);
      this.results = [
        {
          label: 'Root',
          collapsedIcon: 'fa-folder',
          expandedIcon: 'fa-folder-open',
          "children":this.locationTree
        }
      ];
      break;

    }
   }

   treeFormationValue(node1Result,flag){
    if(flag==='CS'){
      for(let element of node1Result) {
        // console.log(element.name+" "+this.getChildFlag(flag));
        this.departmentTree=this.treeFormationValue(element,this.getChildFlag(flag));
        element.label=element.name;
        element.collapsedIcon= 'fa-folder';
        element.expandedIcon= 'fa-folder-open';
        element.type=flag;
        element.children= this.treeFormationValue(element,this.getChildFlag(flag));   

      };
    }
    if(flag==='DP'){
      for(let element of node1Result){
         console.log("DP"+element.name);
        //console.log(element.name+" "+this.getChildFlag(flag));
        element.label=element.name;
        element.collapsedIcon= 'fa-folder';
        element.expandedIcon= 'fa-folder-open';
        element.parent="Hyderabad"
        element.type=flag;
      };
      //console.log(node1Result);
    }
   return <TreeNode[]>node1Result;

  }

  childFormation(node1Result,childFlag){
    switch(childFlag){
      
    case 'DP':
    this.locationService.service(node1Result.id,null,null).then(result=>this.treeFormationValue(result,'DP'));
    break;
    }

   }


   testMethod(value){
    switch(value.node.type){
      case 'CS':
      this.locationService.service(value.node.id,null,null).then(result=>this.node1Formation(result,'DP'));
      value.node.children=this.departmentTree;
      break;
     }
   }
   getChildFlag(flag){
      let childflag=null;
    switch(flag){
      case 'CS':
        childflag='DP';
        break;
      case 'DP' :
        childflag='CT';
        break;
      case 'CT':
        childflag='SC'
        break;

    }

    return childflag;


   }

   
}
