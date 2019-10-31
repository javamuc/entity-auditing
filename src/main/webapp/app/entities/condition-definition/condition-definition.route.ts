import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ConditionDefinition } from 'app/shared/model/condition-definition.model';
import { ConditionDefinitionService } from './condition-definition.service';
import { ConditionDefinitionComponent } from './condition-definition.component';
import { ConditionDefinitionDetailComponent } from './condition-definition-detail.component';
import { ConditionDefinitionUpdateComponent } from './condition-definition-update.component';
import { ConditionDefinitionDeletePopupComponent } from './condition-definition-delete-dialog.component';
import { IConditionDefinition } from 'app/shared/model/condition-definition.model';

@Injectable({ providedIn: 'root' })
export class ConditionDefinitionResolve implements Resolve<IConditionDefinition> {
  constructor(private service: ConditionDefinitionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IConditionDefinition> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ConditionDefinition>) => response.ok),
        map((conditionDefinition: HttpResponse<ConditionDefinition>) => conditionDefinition.body)
      );
    }
    return of(new ConditionDefinition());
  }
}

export const conditionDefinitionRoute: Routes = [
  {
    path: '',
    component: ConditionDefinitionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.conditionDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConditionDefinitionDetailComponent,
    resolve: {
      conditionDefinition: ConditionDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.conditionDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConditionDefinitionUpdateComponent,
    resolve: {
      conditionDefinition: ConditionDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.conditionDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConditionDefinitionUpdateComponent,
    resolve: {
      conditionDefinition: ConditionDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.conditionDefinition.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const conditionDefinitionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ConditionDefinitionDeletePopupComponent,
    resolve: {
      conditionDefinition: ConditionDefinitionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.conditionDefinition.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
