import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PartSale } from 'app/shared/model/part-sale.model';
import { PartSaleService } from './part-sale.service';
import { PartSaleComponent } from './part-sale.component';
import { PartSaleDetailComponent } from './part-sale-detail.component';
import { PartSaleUpdateComponent } from './part-sale-update.component';
import { PartSaleDeletePopupComponent } from './part-sale-delete-dialog.component';
import { IPartSale } from 'app/shared/model/part-sale.model';

@Injectable({ providedIn: 'root' })
export class PartSaleResolve implements Resolve<IPartSale> {
  constructor(private service: PartSaleService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPartSale> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PartSale>) => response.ok),
        map((partSale: HttpResponse<PartSale>) => partSale.body)
      );
    }
    return of(new PartSale());
  }
}

export const partSaleRoute: Routes = [
  {
    path: '',
    component: PartSaleComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.partSale.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PartSaleDetailComponent,
    resolve: {
      partSale: PartSaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.partSale.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PartSaleUpdateComponent,
    resolve: {
      partSale: PartSaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.partSale.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PartSaleUpdateComponent,
    resolve: {
      partSale: PartSaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.partSale.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const partSalePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PartSaleDeletePopupComponent,
    resolve: {
      partSale: PartSaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.partSale.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
