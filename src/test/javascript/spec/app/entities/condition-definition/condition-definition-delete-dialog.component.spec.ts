import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EntityAuditingTestModule } from '../../../test.module';
import { ConditionDefinitionDeleteDialogComponent } from 'app/entities/condition-definition/condition-definition-delete-dialog.component';
import { ConditionDefinitionService } from 'app/entities/condition-definition/condition-definition.service';

describe('Component Tests', () => {
  describe('ConditionDefinition Management Delete Component', () => {
    let comp: ConditionDefinitionDeleteDialogComponent;
    let fixture: ComponentFixture<ConditionDefinitionDeleteDialogComponent>;
    let service: ConditionDefinitionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [ConditionDefinitionDeleteDialogComponent]
      })
        .overrideTemplate(ConditionDefinitionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConditionDefinitionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConditionDefinitionService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('123');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('123');
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});