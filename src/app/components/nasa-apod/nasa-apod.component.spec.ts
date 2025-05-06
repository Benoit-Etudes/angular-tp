import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasaApodComponent } from './nasa-apod.component';

describe('NasaApodComponent', () => {
  let component: NasaApodComponent;
  let fixture: ComponentFixture<NasaApodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NasaApodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasaApodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
