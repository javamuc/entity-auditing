import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EntityAuditingTestModule } from '../../../test.module';
import { DeductionDeleteDialogComponent } from 'app/entities/deduction/deduction-delete-dialog.component';
import { DeductionService } from 'app/entities/deduction/deduction.service';

describe('Component Tests', () => {
  describe('Deduction Management Delete Component', () => {
    let comp: DeductionDeleteDialogComponent;
    let fixture: ComponentFixture<DeductionDeleteDialogComponent>;
    let service: DeductionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [DeductionDeleteDialogComponent]
      })
        .overrideTemplate(DeductionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeductionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeductionService);
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
