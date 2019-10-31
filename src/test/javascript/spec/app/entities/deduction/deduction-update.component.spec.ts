import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EntityAuditingTestModule } from '../../../test.module';
import { DeductionUpdateComponent } from 'app/entities/deduction/deduction-update.component';
import { DeductionService } from 'app/entities/deduction/deduction.service';
import { Deduction } from 'app/shared/model/deduction.model';

describe('Component Tests', () => {
  describe('Deduction Management Update Component', () => {
    let comp: DeductionUpdateComponent;
    let fixture: ComponentFixture<DeductionUpdateComponent>;
    let service: DeductionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [DeductionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DeductionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeductionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeductionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Deduction('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Deduction();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
