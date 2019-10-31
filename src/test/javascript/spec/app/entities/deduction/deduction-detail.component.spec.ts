import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EntityAuditingTestModule } from '../../../test.module';
import { DeductionDetailComponent } from 'app/entities/deduction/deduction-detail.component';
import { Deduction } from 'app/shared/model/deduction.model';

describe('Component Tests', () => {
  describe('Deduction Management Detail Component', () => {
    let comp: DeductionDetailComponent;
    let fixture: ComponentFixture<DeductionDetailComponent>;
    const route = ({ data: of({ deduction: new Deduction('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [DeductionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DeductionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeductionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.deduction).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
