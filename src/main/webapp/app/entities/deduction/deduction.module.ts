import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntityAuditingSharedModule } from 'app/shared/shared.module';
import { DeductionComponent } from './deduction.component';
import { DeductionDetailComponent } from './deduction-detail.component';
import { DeductionUpdateComponent } from './deduction-update.component';
import { DeductionDeletePopupComponent, DeductionDeleteDialogComponent } from './deduction-delete-dialog.component';
import { deductionRoute, deductionPopupRoute } from './deduction.route';

const ENTITY_STATES = [...deductionRoute, ...deductionPopupRoute];

@NgModule({
  imports: [EntityAuditingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DeductionComponent,
    DeductionDetailComponent,
    DeductionUpdateComponent,
    DeductionDeleteDialogComponent,
    DeductionDeletePopupComponent
  ],
  entryComponents: [DeductionDeleteDialogComponent]
})
export class EntityAuditingDeductionModule {}
