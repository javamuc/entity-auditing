import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPrice } from 'app/shared/model/price.model';
import { AccountService } from 'app/core/auth/account.service';
import { PriceService } from './price.service';

@Component({
  selector: 'jhi-price',
  templateUrl: './price.component.html'
})
export class PriceComponent implements OnInit, OnDestroy {
  prices: IPrice[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected priceService: PriceService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.priceService
      .query()
      .pipe(
        filter((res: HttpResponse<IPrice[]>) => res.ok),
        map((res: HttpResponse<IPrice[]>) => res.body)
      )
      .subscribe((res: IPrice[]) => {
        this.prices = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPrices();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPrice) {
    return item.id;
  }

  registerChangeInPrices() {
    this.eventSubscriber = this.eventManager.subscribe('priceListModification', response => this.loadAll());
  }
}
