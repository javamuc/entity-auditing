import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeduction } from 'app/shared/model/deduction.model';
import { DeductionService } from './deduction.service';

@Component({
  selector: 'jhi-deduction-delete-dialog',
  templateUrl: './deduction-delete-dialog.component.html'
})
export class DeductionDeleteDialogComponent {
  deduction: IDeduction;

  constructor(protected deductionService: DeductionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.deductionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'deductionListModification',
        content: 'Deleted an deduction'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-deduction-delete-popup',
  template: ''
})
export class DeductionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ deduction }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DeductionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.deduction = deduction;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/deduction', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/deduction', { outlets: { popup: null } }]);
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
