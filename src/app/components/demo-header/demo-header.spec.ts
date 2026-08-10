import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoHeader } from './demo-header';

describe('DemoHeader', () => {
  let component: DemoHeader;
  let fixture: ComponentFixture<DemoHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
