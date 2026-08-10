import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scdental } from './scdental';

describe('Scdental', () => {
  let component: Scdental;
  let fixture: ComponentFixture<Scdental>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scdental]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scdental);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
