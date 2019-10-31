import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPriceList } from 'app/shared/model/price-list.model';
import { PriceListService } from './price-list.service';

@Component({
  selector: 'jhi-price-list-delete-dialog',
  templateUrl: './price-list-delete-dialog.component.html'
})
export class PriceListDeleteDialogComponent {
  priceList: IPriceList;

  constructor(protected priceListService: PriceListService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.priceListService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'priceListListModification',
        content: 'Deleted an priceList'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-price-list-delete-popup',
  template: ''
})
export class PriceListDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ priceList }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PriceListDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.priceList = priceList;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/price-list', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/price-list', { outlets: { popup: null } }]);
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
