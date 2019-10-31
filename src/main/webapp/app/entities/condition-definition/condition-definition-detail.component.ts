import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConditionDefinition } from 'app/shared/model/condition-definition.model';

@Component({
  selector: 'jhi-condition-definition-detail',
  templateUrl: './condition-definition-detail.component.html'
})
export class ConditionDefinitionDetailComponent implements OnInit {
  conditionDefinition: IConditionDefinition;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ conditionDefinition }) => {
      this.conditionDefinition = conditionDefinition;
    });
  }

  previousState() {
    window.history.back();
  }
}
