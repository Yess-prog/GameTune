import { ComponentFixture, TestBed } from '@angular/core/testing';

import { X360Component } from './x360.component';

describe('X360Component', () => {
  let component: X360Component;
  let fixture: ComponentFixture<X360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [X360Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(X360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
