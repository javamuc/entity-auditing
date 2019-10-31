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
import { IPrice, Price } from 'app/shared/model/price.model';
import { PriceService } from './price.service';
import { IPriceList } from 'app/shared/model/price-list.model';
import { PriceListService } from 'app/entities/price-list/price-list.service';

@Component({
  selector: 'jhi-price-update',
  templateUrl: './price-update.component.html'
})
export class PriceUpdateComponent implements OnInit {
  isSaving: boolean;

  pricelists: IPriceList[];

  editForm = this.fb.group({
    id: [],
    model: [],
    condition: [],
    price: [],
    createdBy: [],
    createdAt: [],
    lastUpdatedBy: [],
    lastUpdatedAt: [],
    priceList: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected priceService: PriceService,
    protected priceListService: PriceListService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ price }) => {
      this.updateForm(price);
    });
    this.priceListService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPriceList[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPriceList[]>) => response.body)
      )
      .subscribe((res: IPriceList[]) => (this.pricelists = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(price: IPrice) {
    this.editForm.patchValue({
      id: price.id,
      model: price.model,
      condition: price.condition,
      price: price.price,
      createdBy: price.createdBy,
      createdAt: price.createdAt != null ? price.createdAt.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: price.lastUpdatedBy,
      lastUpdatedAt: price.lastUpdatedAt != null ? price.lastUpdatedAt.format(DATE_TIME_FORMAT) : null,
      priceList: price.priceList
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const price = this.createFromForm();
    if (price.id !== undefined) {
      this.subscribeToSaveResponse(this.priceService.update(price));
    } else {
      this.subscribeToSaveResponse(this.priceService.create(price));
    }
  }

  private createFromForm(): IPrice {
    return {
      ...new Price(),
      id: this.editForm.get(['id']).value,
      model: this.editForm.get(['model']).value,
      condition: this.editForm.get(['condition']).value,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrice>>) {
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
