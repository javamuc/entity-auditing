import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConditionDefinition } from 'app/shared/model/condition-definition.model';
import { ConditionDefinitionService } from './condition-definition.service';

@Component({
  selector: 'jhi-condition-definition-delete-dialog',
  templateUrl: './condition-definition-delete-dialog.component.html'
})
export class ConditionDefinitionDeleteDialogComponent {
  conditionDefinition: IConditionDefinition;

  constructor(
    protected conditionDefinitionService: ConditionDefinitionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.conditionDefinitionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'conditionDefinitionListModification',
        content: 'Deleted an conditionDefinition'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-condition-definition-delete-popup',
  template: ''
})
export class ConditionDefinitionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ conditionDefinition }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ConditionDefinitionDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.conditionDefinition = conditionDefinition;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/condition-definition', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/condition-definition', { outlets: { popup: null } }]);
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
