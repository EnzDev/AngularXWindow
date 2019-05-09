import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicWindowComponent } from './classic-window.component';

describe('ClassicWindowComponent', () => {
  let component: ClassicWindowComponent;
  let fixture: ComponentFixture<ClassicWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassicWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
