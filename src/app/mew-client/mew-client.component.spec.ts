import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MewClientComponent } from './mew-client.component';

describe('MewClientComponent', () => {
  let component: MewClientComponent;
  let fixture: ComponentFixture<MewClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MewClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
