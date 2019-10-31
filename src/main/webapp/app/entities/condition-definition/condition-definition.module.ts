import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntityAuditingSharedModule } from 'app/shared/shared.module';
import { ConditionDefinitionComponent } from './condition-definition.component';
import { ConditionDefinitionDetailComponent } from './condition-definition-detail.component';
import { ConditionDefinitionUpdateComponent } from './condition-definition-update.component';
import {
  ConditionDefinitionDeletePopupComponent,
  ConditionDefinitionDeleteDialogComponent
} from './condition-definition-delete-dialog.component';
import { conditionDefinitionRoute, conditionDefinitionPopupRoute } from './condition-definition.route';

const ENTITY_STATES = [...conditionDefinitionRoute, ...conditionDefinitionPopupRoute];

@NgModule({
  imports: [EntityAuditingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ConditionDefinitionComponent,
    ConditionDefinitionDetailComponent,
    ConditionDefinitionUpdateComponent,
    ConditionDefinitionDeleteDialogComponent,
    ConditionDefinitionDeletePopupComponent
  ],
  entryComponents: [ConditionDefinitionDeleteDialogComponent]
})
export class EntityAuditingConditionDefinitionModule {}
