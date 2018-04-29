import { Component, OnInit } from '@angular/core';
import { LocationService } from '../locationService';
import { TreeNode, TreeModule } from 'primeng/primeng';


import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-tree-hierarchical',
  templateUrl: './tree-hierarchical.component.html',
  styleUrls: ['./tree-hierarchical.component.css']
})
export class TreeHierarchicalComponent implements OnInit {

  results: TreeNode[];
  locationTree: TreeNode[];
  element: TreeNode;
  constructor(private locationService: LocationService) { }

  nodeSelect(value) { }

  nodeUnselect(value) { }

  loadNode(value) {
    if (value.node) {
      switch (value.node.type) {
        case 'ROOT':
          this.locationService.service(null, null, null).then(result =>
            value.node.children = this.treeFormationValue(result, this.getChildFlag(value.node.type), value.node));
          break;

        case 'CS':
          this.locationService.service(value.node.id, null, null).then(result =>
            value.node.children = this.treeFormationValue(result, this.getChildFlag(value.node.type), value.node));
          break;
        case 'DP':
          const args: string[] = value.node.parentValue.split('/');
          this.locationService.service(args[0], value.node.id, null).then(result =>
            value.node.children = this.treeFormationValue(result, this.getChildFlag(value.node.type), value.node));
          break;
        case 'CT':
          const arg: string[] = value.node.parentValue.split('/');
          this.locationService.service(arg[0], arg[1], value.node.id).then(result =>
            value.node.children = this.treeFormationValue(result, this.getChildFlag(value.node.type), value.node));
          break;
      }
    }

  }

  ngOnInit() {
    this.locationService.service(null, null, null).then(result => this.node1Formation(result, 'CS'));
    
  }

  node1Formation(node1Result, flag) {
    this.results = [
      {
        label: 'Root',
        collapsedIcon: 'fa-folder',
        expandedIcon: 'fa-folder-open',
        type: 'ROOT',
        leaf: false
      }
    ];
  }

  treeFormationValue(node1Result, flag, node) {

    const locationTreeValue = node1Result;
    if (flag === 'CS') {
      for (let element of locationTreeValue) {
        element.label = element.name;
        element.collapsedIcon = 'fa-folder';
        element.expandedIcon = 'fa-folder-open';
        element.type = flag;
        element.leaf = false;
        element.parentValue = element.id + '';
      }
    }
    if (flag === 'DP') {
      for (let element of locationTreeValue) {
        element.label = element.name;
        element.collapsedIcon = 'fa-folder';
        element.expandedIcon = 'fa-folder-open';
        element.type = flag;
        element.leaf = false;
        element.parentValue = node.parentValue + '/' + element.id;
      }
    }
    if (flag === 'CT') {
      for (let element of locationTreeValue) {
        console.log('CT' + element.name);
        element.label = element.name;
        element.collapsedIcon = 'fa-folder';
        element.expandedIcon = 'fa-folder-open';
        element.type = flag;
        element.leaf = false;
        element.parentValue = node.parentValue + '/' + element.id;
      }
    }
    if (flag === 'SC') {
      for (let element of locationTreeValue) {
        console.log('CT' + element.name);
        element.label = element.name;
        element.collapsedIcon = 'fa-folder';
        element.expandedIcon = 'fa-folder-open';
        element.type = flag;
        element.leaf = true;
        element.parentValue = node.parentValue + '/' + element.id;
      }
    }
    console.log(locationTreeValue);
    return <TreeNode[]>locationTreeValue;

  }


  getChildFlag(flag) {
    let childflag = null;
    console.log(flag);
    switch (flag) {
      case 'ROOT':
        childflag = 'CS';
        break;
      case 'CS':
        childflag = 'DP';
        break;
      case 'DP':
        childflag = 'CT';
        break;
      case 'CT':
        childflag = 'SC';
        break;

    }

    return childflag;


  }
}
