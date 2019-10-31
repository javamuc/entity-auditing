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
import { IDeduction, Deduction } from 'app/shared/model/deduction.model';
import { DeductionService } from './deduction.service';
import { IPriceList } from 'app/shared/model/price-list.model';
import { PriceListService } from 'app/entities/price-list/price-list.service';

@Component({
  selector: 'jhi-deduction-update',
  templateUrl: './deduction-update.component.html'
})
export class DeductionUpdateComponent implements OnInit {
  isSaving: boolean;

  pricelists: IPriceList[];

  editForm = this.fb.group({
    id: [],
    reason: [],
    price: [],
    createdBy: [],
    createdAt: [],
    lastUpdatedBy: [],
    lastUpdatedAt: [],
    priceList: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected deductionService: DeductionService,
    protected priceListService: PriceListService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ deduction }) => {
      this.updateForm(deduction);
    });
    this.priceListService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPriceList[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPriceList[]>) => response.body)
      )
      .subscribe((res: IPriceList[]) => (this.pricelists = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(deduction: IDeduction) {
    this.editForm.patchValue({
      id: deduction.id,
      reason: deduction.reason,
      price: deduction.price,
      createdBy: deduction.createdBy,
      createdAt: deduction.createdAt != null ? deduction.createdAt.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: deduction.lastUpdatedBy,
      lastUpdatedAt: deduction.lastUpdatedAt != null ? deduction.lastUpdatedAt.format(DATE_TIME_FORMAT) : null,
      priceList: deduction.priceList
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const deduction = this.createFromForm();
    if (deduction.id !== undefined) {
      this.subscribeToSaveResponse(this.deductionService.update(deduction));
    } else {
      this.subscribeToSaveResponse(this.deductionService.create(deduction));
    }
  }

  private createFromForm(): IDeduction {
    return {
      ...new Deduction(),
      id: this.editForm.get(['id']).value,
      reason: this.editForm.get(['reason']).value,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDeduction>>) {
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
