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
  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.service(null, null, null).then(result => this.rootNodeFormation());

  }

  rootNodeFormation() {
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

  loadChildNode(value) {
    if (value.node) {
      switch (value.node.type) {
        case 'ROOT':
          this.locationService.service(null, null, null).then(result =>
            value.node.children = this.childTreeNodeFormation(result, this.getChildFlag(value.node.type), value.node));
          break;

        case 'CS':
          this.locationService.service(value.node.id, null, null).then(result =>
            value.node.children = this.childTreeNodeFormation(result, this.getChildFlag(value.node.type), value.node));
          break;
        case 'DP':
          const args: string[] = value.node.parentValue.split('/');
          this.locationService.service(args[0], value.node.id, null).then(result =>
            value.node.children = this.childTreeNodeFormation(result, this.getChildFlag(value.node.type), value.node));
          break;
        case 'CT':
          const arg: string[] = value.node.parentValue.split('/');
          this.locationService.service(arg[0], arg[1], value.node.id).then(result =>
            value.node.children = this.childTreeNodeFormation(result, this.getChildFlag(value.node.type), value.node));
          break;
      }
    }

  }

  childTreeNodeFormation(childData, flag, node) {

    if (flag === 'CS') {
      for (let element of childData) {
        element.label = element.name;
        element.collapsedIcon = 'fa-folder';
        element.expandedIcon = 'fa-folder-open';
        element.type = flag;
        element.leaf = false;
        element.parentValue = element.id + '';
      }
    }
    if (flag === 'DP') {
      for (let element of childData) {
        element.label = element.name;
        element.collapsedIcon = 'fa-folder';
        element.expandedIcon = 'fa-folder-open';
        element.type = flag;
        element.leaf = false;
        element.parentValue = node.parentValue + '/' + element.id;
      }
    }
    if (flag === 'CT') {
      for (let element of childData) {
        element.label = element.name;
        element.collapsedIcon = 'fa-folder';
        element.expandedIcon = 'fa-folder-open';
        element.type = flag;
        element.leaf = false;
        element.parentValue = node.parentValue + '/' + element.id;
      }
    }
    if (flag === 'SC') {
      for (let element of childData) {
        element.label = element.name;
        element.collapsedIcon = 'fa-folder';
        element.expandedIcon = 'fa-folder-open';
        element.type = flag;
        element.leaf = true;
        element.parentValue = node.parentValue + '/' + element.id;
      }
    }

    return <TreeNode[]>childData;

  }


  getChildFlag(flag) {
    let childflag = null;
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
