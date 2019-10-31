import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IConditionDefinition } from 'app/shared/model/condition-definition.model';
import { AccountService } from 'app/core/auth/account.service';
import { ConditionDefinitionService } from './condition-definition.service';

@Component({
  selector: 'jhi-condition-definition',
  templateUrl: './condition-definition.component.html'
})
export class ConditionDefinitionComponent implements OnInit, OnDestroy {
  conditionDefinitions: IConditionDefinition[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected conditionDefinitionService: ConditionDefinitionService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.conditionDefinitionService
      .query()
      .pipe(
        filter((res: HttpResponse<IConditionDefinition[]>) => res.ok),
        map((res: HttpResponse<IConditionDefinition[]>) => res.body)
      )
      .subscribe((res: IConditionDefinition[]) => {
        this.conditionDefinitions = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInConditionDefinitions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IConditionDefinition) {
    return item.id;
  }

  registerChangeInConditionDefinitions() {
    this.eventSubscriber = this.eventManager.subscribe('conditionDefinitionListModification', response => this.loadAll());
  }
}
