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
import { IConditionDefinition, ConditionDefinition } from 'app/shared/model/condition-definition.model';
import { ConditionDefinitionService } from './condition-definition.service';
import { IPriceList } from 'app/shared/model/price-list.model';
import { PriceListService } from 'app/entities/price-list/price-list.service';

@Component({
  selector: 'jhi-condition-definition-update',
  templateUrl: './condition-definition-update.component.html'
})
export class ConditionDefinitionUpdateComponent implements OnInit {
  isSaving: boolean;

  pricelists: IPriceList[];

  editForm = this.fb.group({
    id: [],
    definition: [],
    description: [],
    createdBy: [],
    createdAt: [],
    lastUpdatedBy: [],
    lastUpdatedAt: [],
    priceList: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected conditionDefinitionService: ConditionDefinitionService,
    protected priceListService: PriceListService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ conditionDefinition }) => {
      this.updateForm(conditionDefinition);
    });
    this.priceListService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPriceList[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPriceList[]>) => response.body)
      )
      .subscribe((res: IPriceList[]) => (this.pricelists = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(conditionDefinition: IConditionDefinition) {
    this.editForm.patchValue({
      id: conditionDefinition.id,
      definition: conditionDefinition.definition,
      description: conditionDefinition.description,
      createdBy: conditionDefinition.createdBy,
      createdAt: conditionDefinition.createdAt != null ? conditionDefinition.createdAt.format(DATE_TIME_FORMAT) : null,
      lastUpdatedBy: conditionDefinition.lastUpdatedBy,
      lastUpdatedAt: conditionDefinition.lastUpdatedAt != null ? conditionDefinition.lastUpdatedAt.format(DATE_TIME_FORMAT) : null,
      priceList: conditionDefinition.priceList
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const conditionDefinition = this.createFromForm();
    if (conditionDefinition.id !== undefined) {
      this.subscribeToSaveResponse(this.conditionDefinitionService.update(conditionDefinition));
    } else {
      this.subscribeToSaveResponse(this.conditionDefinitionService.create(conditionDefinition));
    }
  }

  private createFromForm(): IConditionDefinition {
    return {
      ...new ConditionDefinition(),
      id: this.editForm.get(['id']).value,
      definition: this.editForm.get(['definition']).value,
      description: this.editForm.get(['description']).value,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConditionDefinition>>) {
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
