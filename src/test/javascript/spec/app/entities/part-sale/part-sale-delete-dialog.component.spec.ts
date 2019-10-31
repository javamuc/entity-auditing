import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EntityAuditingTestModule } from '../../../test.module';
import { PartSaleDeleteDialogComponent } from 'app/entities/part-sale/part-sale-delete-dialog.component';
import { PartSaleService } from 'app/entities/part-sale/part-sale.service';

describe('Component Tests', () => {
  describe('PartSale Management Delete Component', () => {
    let comp: PartSaleDeleteDialogComponent;
    let fixture: ComponentFixture<PartSaleDeleteDialogComponent>;
    let service: PartSaleService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [PartSaleDeleteDialogComponent]
      })
        .overrideTemplate(PartSaleDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PartSaleDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PartSaleService);
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
