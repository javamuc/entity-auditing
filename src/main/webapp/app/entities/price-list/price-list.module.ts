import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntityAuditingSharedModule } from 'app/shared/shared.module';
import { PriceListComponent } from './price-list.component';
import { PriceListDetailComponent } from './price-list-detail.component';
import { PriceListUpdateComponent } from './price-list-update.component';
import { PriceListDeletePopupComponent, PriceListDeleteDialogComponent } from './price-list-delete-dialog.component';
import { priceListRoute, priceListPopupRoute } from './price-list.route';

const ENTITY_STATES = [...priceListRoute, ...priceListPopupRoute];

@NgModule({
  imports: [EntityAuditingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PriceListComponent,
    PriceListDetailComponent,
    PriceListUpdateComponent,
    PriceListDeleteDialogComponent,
    PriceListDeletePopupComponent
  ],
  entryComponents: [PriceListDeleteDialogComponent]
})
export class EntityAuditingPriceListModule {}
