import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioLayout } from './portfolio-layout';

describe('PortfolioLayout', () => {
  let component: PortfolioLayout;
  let fixture: ComponentFixture<PortfolioLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
