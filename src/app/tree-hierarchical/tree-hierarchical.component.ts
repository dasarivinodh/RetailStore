import { Component, OnInit } from '@angular/core';
import { LocationService } from '../locationService';
import { TreeNode } from 'primeng/primeng';


@Component({
  selector: 'app-tree-hierarchical',
  templateUrl: './tree-hierarchical.component.html',
  styleUrls: ['./tree-hierarchical.component.css']
})
export class TreeHierarchicalComponent implements OnInit {

  results: TreeNode[];

  constructor(private locationService:LocationService) { }

  ngOnInit() {

    console.log(this.locationService.service('1','3','1'));

    this.results = [
      {
        label: 'value1',
        collapsedIcon: 'fa-folder',
        expandedIcon: 'fa-folder-open'
      }
    ];
  }

}
