import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IDeduction } from 'app/shared/model/deduction.model';
import { AccountService } from 'app/core/auth/account.service';
import { DeductionService } from './deduction.service';

@Component({
  selector: 'jhi-deduction',
  templateUrl: './deduction.component.html'
})
export class DeductionComponent implements OnInit, OnDestroy {
  deductions: IDeduction[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected deductionService: DeductionService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.deductionService
      .query()
      .pipe(
        filter((res: HttpResponse<IDeduction[]>) => res.ok),
        map((res: HttpResponse<IDeduction[]>) => res.body)
      )
      .subscribe((res: IDeduction[]) => {
        this.deductions = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDeductions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDeduction) {
    return item.id;
  }

  registerChangeInDeductions() {
    this.eventSubscriber = this.eventManager.subscribe('deductionListModification', response => this.loadAll());
  }
}
