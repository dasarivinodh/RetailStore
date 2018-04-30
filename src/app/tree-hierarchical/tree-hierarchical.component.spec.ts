import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeHierarchicalComponent } from './tree-hierarchical.component';

describe('TreeHierarchicalComponent', () => {
  let component: TreeHierarchicalComponent;
  let fixture: ComponentFixture<TreeHierarchicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeHierarchicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeHierarchicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
