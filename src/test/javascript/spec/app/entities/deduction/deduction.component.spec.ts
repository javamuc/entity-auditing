import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EntityAuditingTestModule } from '../../../test.module';
import { DeductionComponent } from 'app/entities/deduction/deduction.component';
import { DeductionService } from 'app/entities/deduction/deduction.service';
import { Deduction } from 'app/shared/model/deduction.model';

describe('Component Tests', () => {
  describe('Deduction Management Component', () => {
    let comp: DeductionComponent;
    let fixture: ComponentFixture<DeductionComponent>;
    let service: DeductionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [DeductionComponent],
        providers: []
      })
        .overrideTemplate(DeductionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeductionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeductionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Deduction('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.deductions[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });
  });
});
