import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Deduction } from 'app/shared/model/deduction.model';
import { DeductionService } from './deduction.service';
import { DeductionComponent } from './deduction.component';
import { DeductionDetailComponent } from './deduction-detail.component';
import { DeductionUpdateComponent } from './deduction-update.component';
import { DeductionDeletePopupComponent } from './deduction-delete-dialog.component';
import { IDeduction } from 'app/shared/model/deduction.model';

@Injectable({ providedIn: 'root' })
export class DeductionResolve implements Resolve<IDeduction> {
  constructor(private service: DeductionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDeduction> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Deduction>) => response.ok),
        map((deduction: HttpResponse<Deduction>) => deduction.body)
      );
    }
    return of(new Deduction());
  }
}

export const deductionRoute: Routes = [
  {
    path: '',
    component: DeductionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.deduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DeductionDetailComponent,
    resolve: {
      deduction: DeductionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.deduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DeductionUpdateComponent,
    resolve: {
      deduction: DeductionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.deduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DeductionUpdateComponent,
    resolve: {
      deduction: DeductionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.deduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const deductionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DeductionDeletePopupComponent,
    resolve: {
      deduction: DeductionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.deduction.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
