import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionDialog } from './facturacion-dialog';

describe('FacturacionDialog', () => {
  let component: FacturacionDialog;
  let fixture: ComponentFixture<FacturacionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturacionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturacionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
