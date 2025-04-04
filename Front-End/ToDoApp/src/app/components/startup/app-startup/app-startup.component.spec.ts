import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStartupComponent } from './app-startup.component';

describe('AppStartupComponent', () => {
  let component: AppStartupComponent;
  let fixture: ComponentFixture<AppStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStartupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
