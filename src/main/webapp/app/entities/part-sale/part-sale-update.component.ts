import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPartSale, PartSale } from 'app/shared/model/part-sale.model';
import { PartSaleService } from './part-sale.service';
import { IPriceList } from 'app/shared/model/price-list.model';
import { PriceListService } from 'app/entities/price-list/price-list.service';

@Component({
  selector: 'jhi-part-sale-update',
  templateUrl: './part-sale-update.component.html'
})
export class PartSaleUpdateComponent implements OnInit {
  isSaving: boolean;

  pricelists: IPriceList[];

  editForm = this.fb.group({
    id: [],
    name: [],
    price: [],
    createdBy: [],
    createdAt: [],
    lastUpdatedBy: [],
    lastUpdatedAt: [],
    priceList: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partSaleService: PartSaleService,
    protected priceListService: PriceListService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ partSale }) => {
      this.updateForm(partSale);
    });
    this.priceListService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPriceList[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPriceList[]>) => response.body)
      )
      .subscribe((res: IPriceList[]) => (this.pricelists = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(partSale: IPartSale) {
    this.editForm.patchValue({
      id: partSale.id,
      name: partSale.name,
      price: partSale.price,
      createdBy: partSale.createdBy,
      createdAt: partSale.createdAt != null ? partSale.createdAt.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: partSale.lastUpdatedBy,
      lastUpdatedAt: partSale.lastUpdatedAt != null ? partSale.lastUpdatedAt.format(DATE_TIME_FORMAT) : null,
      priceList: partSale.priceList
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const partSale = this.createFromForm();
    if (partSale.id !== undefined) {
      this.subscribeToSaveResponse(this.partSaleService.update(partSale));
    } else {
      this.subscribeToSaveResponse(this.partSaleService.create(partSale));
    }
  }

  private createFromForm(): IPartSale {
    return {
      ...new PartSale(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      price: this.editForm.get(['price']).value,
      createdBy: this.editForm.get(['createdBy']).value,
      createdAt:
        this.editForm.get(['createdAt']).value != null ? moment(this.editForm.get(['createdAt']).value, DATE_TIME_FORMAT) : undefined,
      lastUpdatedBy: this.editForm.get(['lastUpdatedBy']).value,
      lastUpdatedAt:
        this.editForm.get(['lastUpdatedAt']).value != null
          ? moment(this.editForm.get(['lastUpdatedAt']).value, DATE_TIME_FORMAT)
          : undefined,
      priceList: this.editForm.get(['priceList']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPartSale>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPriceListById(index: number, item: IPriceList) {
    return item.id;
  }
}
