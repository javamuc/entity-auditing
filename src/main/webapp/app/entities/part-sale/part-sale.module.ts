import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntityAuditingSharedModule } from 'app/shared/shared.module';
import { PartSaleComponent } from './part-sale.component';
import { PartSaleDetailComponent } from './part-sale-detail.component';
import { PartSaleUpdateComponent } from './part-sale-update.component';
import { PartSaleDeletePopupComponent, PartSaleDeleteDialogComponent } from './part-sale-delete-dialog.component';
import { partSaleRoute, partSalePopupRoute } from './part-sale.route';

const ENTITY_STATES = [...partSaleRoute, ...partSalePopupRoute];

@NgModule({
  imports: [EntityAuditingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PartSaleComponent,
    PartSaleDetailComponent,
    PartSaleUpdateComponent,
    PartSaleDeleteDialogComponent,
    PartSaleDeletePopupComponent
  ],
  entryComponents: [PartSaleDeleteDialogComponent]
})
export class EntityAuditingPartSaleModule {}
