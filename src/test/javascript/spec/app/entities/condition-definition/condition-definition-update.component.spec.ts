import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EntityAuditingTestModule } from '../../../test.module';
import { ConditionDefinitionUpdateComponent } from 'app/entities/condition-definition/condition-definition-update.component';
import { ConditionDefinitionService } from 'app/entities/condition-definition/condition-definition.service';
import { ConditionDefinition } from 'app/shared/model/condition-definition.model';

describe('Component Tests', () => {
  describe('ConditionDefinition Management Update Component', () => {
    let comp: ConditionDefinitionUpdateComponent;
    let fixture: ComponentFixture<ConditionDefinitionUpdateComponent>;
    let service: ConditionDefinitionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [ConditionDefinitionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ConditionDefinitionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConditionDefinitionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConditionDefinitionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ConditionDefinition('123');
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
        const entity = new ConditionDefinition();
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
