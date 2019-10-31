import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPartSale } from 'app/shared/model/part-sale.model';
import { AccountService } from 'app/core/auth/account.service';
import { PartSaleService } from './part-sale.service';

@Component({
  selector: 'jhi-part-sale',
  templateUrl: './part-sale.component.html'
})
export class PartSaleComponent implements OnInit, OnDestroy {
  partSales: IPartSale[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected partSaleService: PartSaleService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.partSaleService
      .query()
      .pipe(
        filter((res: HttpResponse<IPartSale[]>) => res.ok),
        map((res: HttpResponse<IPartSale[]>) => res.body)
      )
      .subscribe((res: IPartSale[]) => {
        this.partSales = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPartSales();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPartSale) {
    return item.id;
  }

  registerChangeInPartSales() {
    this.eventSubscriber = this.eventManager.subscribe('partSaleListModification', response => this.loadAll());
  }
}
