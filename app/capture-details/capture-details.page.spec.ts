import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaptureDetailsPage } from './capture-details.page';

describe('CaptureDetailsPage', () => {
  let component: CaptureDetailsPage;
  let fixture: ComponentFixture<CaptureDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
