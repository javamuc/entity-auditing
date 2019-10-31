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
import { IPriceList, PriceList } from 'app/shared/model/price-list.model';
import { PriceListService } from './price-list.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';

@Component({
  selector: 'jhi-price-list-update',
  templateUrl: './price-list-update.component.html'
})
export class PriceListUpdateComponent implements OnInit {
  isSaving: boolean;

  customers: ICustomer[];
  validFromDp: any;
  validTillDp: any;

  editForm = this.fb.group({
    id: [],
    validFrom: [],
    validTill: [],
    type: [],
    createdBy: [],
    createdAt: [],
    lastUpdatedBy: [],
    lastUpdatedAt: [],
    customer: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected priceListService: PriceListService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ priceList }) => {
      this.updateForm(priceList);
    });
    this.customerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICustomer[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICustomer[]>) => response.body)
      )
      .subscribe((res: ICustomer[]) => (this.customers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(priceList: IPriceList) {
    this.editForm.patchValue({
      id: priceList.id,
      validFrom: priceList.validFrom,
      validTill: priceList.validTill,
      type: priceList.type,
      createdBy: priceList.createdBy,
      createdAt: priceList.createdAt != null ? priceList.createdAt.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: priceList.lastUpdatedBy,
      lastUpdatedAt: priceList.lastUpdatedAt != null ? priceList.lastUpdatedAt.format(DATE_TIME_FORMAT) : null,
      customer: priceList.customer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const priceList = this.createFromForm();
    if (priceList.id !== undefined) {
      this.subscribeToSaveResponse(this.priceListService.update(priceList));
    } else {
      this.subscribeToSaveResponse(this.priceListService.create(priceList));
    }
  }

  private createFromForm(): IPriceList {
    return {
      ...new PriceList(),
      id: this.editForm.get(['id']).value,
      validFrom: this.editForm.get(['validFrom']).value,
      validTill: this.editForm.get(['validTill']).value,
      type: this.editForm.get(['type']).value,
      createdBy: this.editForm.get(['createdBy']).value,
      createdAt:
        this.editForm.get(['createdAt']).value != null ? moment(this.editForm.get(['createdAt']).value, DATE_TIME_FORMAT) : undefined,
      lastUpdatedBy: this.editForm.get(['lastUpdatedBy']).value,
      lastUpdatedAt:
        this.editForm.get(['lastUpdatedAt']).value != null
          ? moment(this.editForm.get(['lastUpdatedAt']).value, DATE_TIME_FORMAT)
          : undefined,
      customer: this.editForm.get(['customer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPriceList>>) {
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

  trackCustomerById(index: number, item: ICustomer) {
    return item.id;
  }
}
