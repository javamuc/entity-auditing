import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeduction } from 'app/shared/model/deduction.model';

@Component({
  selector: 'jhi-deduction-detail',
  templateUrl: './deduction-detail.component.html'
})
export class DeductionDetailComponent implements OnInit {
  deduction: IDeduction;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ deduction }) => {
      this.deduction = deduction;
    });
  }

  previousState() {
    window.history.back();
  }
}
