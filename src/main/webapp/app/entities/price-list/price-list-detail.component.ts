import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPriceList } from 'app/shared/model/price-list.model';

@Component({
  selector: 'jhi-price-list-detail',
  templateUrl: './price-list-detail.component.html'
})
export class PriceListDetailComponent implements OnInit {
  priceList: IPriceList;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ priceList }) => {
      this.priceList = priceList;
    });
  }

  previousState() {
    window.history.back();
  }
}
