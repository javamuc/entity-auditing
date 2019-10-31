import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntityAuditingSharedModule } from 'app/shared/shared.module';
import { PriceComponent } from './price.component';
import { PriceDetailComponent } from './price-detail.component';
import { PriceUpdateComponent } from './price-update.component';
import { PriceDeletePopupComponent, PriceDeleteDialogComponent } from './price-delete-dialog.component';
import { priceRoute, pricePopupRoute } from './price.route';

const ENTITY_STATES = [...priceRoute, ...pricePopupRoute];

@NgModule({
  imports: [EntityAuditingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PriceComponent, PriceDetailComponent, PriceUpdateComponent, PriceDeleteDialogComponent, PriceDeletePopupComponent],
  entryComponents: [PriceDeleteDialogComponent]
})
export class EntityAuditingPriceModule {}
