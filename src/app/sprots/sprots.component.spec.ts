import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprotsComponent } from './sprots.component';

describe('SprotsComponent', () => {
  let component: SprotsComponent;
  let fixture: ComponentFixture<SprotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
