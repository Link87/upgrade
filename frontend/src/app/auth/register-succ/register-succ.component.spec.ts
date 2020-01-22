import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuccComponent } from './register-succ.component';

describe('RegisterSuccComponent', () => {
  let component: RegisterSuccComponent;
  let fixture: ComponentFixture<RegisterSuccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSuccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSuccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
