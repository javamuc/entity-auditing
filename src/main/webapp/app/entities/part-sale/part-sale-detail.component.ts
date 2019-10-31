import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartSale } from 'app/shared/model/part-sale.model';

@Component({
  selector: 'jhi-part-sale-detail',
  templateUrl: './part-sale-detail.component.html'
})
export class PartSaleDetailComponent implements OnInit {
  partSale: IPartSale;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ partSale }) => {
      this.partSale = partSale;
    });
  }

  previousState() {
    window.history.back();
  }
}
