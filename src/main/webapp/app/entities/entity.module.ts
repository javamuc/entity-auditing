import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'price-list',
        loadChildren: () => import('./price-list/price-list.module').then(m => m.EntityAuditingPriceListModule)
      },
      {
        path: 'deduction',
        loadChildren: () => import('./deduction/deduction.module').then(m => m.EntityAuditingDeductionModule)
      },
      {
        path: 'part-sale',
        loadChildren: () => import('./part-sale/part-sale.module').then(m => m.EntityAuditingPartSaleModule)
      },
      {
        path: 'condition-definition',
        loadChildren: () =>
          import('./condition-definition/condition-definition.module').then(m => m.EntityAuditingConditionDefinitionModule)
      },
      {
        path: 'price',
        loadChildren: () => import('./price/price.module').then(m => m.EntityAuditingPriceModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.EntityAuditingCustomerModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EntityAuditingEntityModule {}
