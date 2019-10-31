import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPriceList } from 'app/shared/model/price-list.model';
import { AccountService } from 'app/core/auth/account.service';
import { PriceListService } from './price-list.service';

@Component({
  selector: 'jhi-price-list',
  templateUrl: './price-list.component.html'
})
export class PriceListComponent implements OnInit, OnDestroy {
  priceLists: IPriceList[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected priceListService: PriceListService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.priceListService
      .query()
      .pipe(
        filter((res: HttpResponse<IPriceList[]>) => res.ok),
        map((res: HttpResponse<IPriceList[]>) => res.body)
      )
      .subscribe((res: IPriceList[]) => {
        this.priceLists = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPriceLists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPriceList) {
    return item.id;
  }

  registerChangeInPriceLists() {
    this.eventSubscriber = this.eventManager.subscribe('priceListListModification', response => this.loadAll());
  }
}
