import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPartSale } from 'app/shared/model/part-sale.model';
import { PartSaleService } from './part-sale.service';

@Component({
  selector: 'jhi-part-sale-delete-dialog',
  templateUrl: './part-sale-delete-dialog.component.html'
})
export class PartSaleDeleteDialogComponent {
  partSale: IPartSale;

  constructor(protected partSaleService: PartSaleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.partSaleService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'partSaleListModification',
        content: 'Deleted an partSale'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-part-sale-delete-popup',
  template: ''
})
export class PartSaleDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ partSale }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PartSaleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.partSale = partSale;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/part-sale', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/part-sale', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
