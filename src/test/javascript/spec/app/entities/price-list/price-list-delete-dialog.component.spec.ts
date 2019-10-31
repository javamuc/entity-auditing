import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EntityAuditingTestModule } from '../../../test.module';
import { PriceListDeleteDialogComponent } from 'app/entities/price-list/price-list-delete-dialog.component';
import { PriceListService } from 'app/entities/price-list/price-list.service';

describe('Component Tests', () => {
  describe('PriceList Management Delete Component', () => {
    let comp: PriceListDeleteDialogComponent;
    let fixture: ComponentFixture<PriceListDeleteDialogComponent>;
    let service: PriceListService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EntityAuditingTestModule],
        declarations: [PriceListDeleteDialogComponent]
      })
        .overrideTemplate(PriceListDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PriceListDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PriceListService);
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
