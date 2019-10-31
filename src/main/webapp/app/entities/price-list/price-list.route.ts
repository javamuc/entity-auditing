import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PriceList } from 'app/shared/model/price-list.model';
import { PriceListService } from './price-list.service';
import { PriceListComponent } from './price-list.component';
import { PriceListDetailComponent } from './price-list-detail.component';
import { PriceListUpdateComponent } from './price-list-update.component';
import { PriceListDeletePopupComponent } from './price-list-delete-dialog.component';
import { IPriceList } from 'app/shared/model/price-list.model';

@Injectable({ providedIn: 'root' })
export class PriceListResolve implements Resolve<IPriceList> {
  constructor(private service: PriceListService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPriceList> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PriceList>) => response.ok),
        map((priceList: HttpResponse<PriceList>) => priceList.body)
      );
    }
    return of(new PriceList());
  }
}

export const priceListRoute: Routes = [
  {
    path: '',
    component: PriceListComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.priceList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PriceListDetailComponent,
    resolve: {
      priceList: PriceListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.priceList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PriceListUpdateComponent,
    resolve: {
      priceList: PriceListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.priceList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PriceListUpdateComponent,
    resolve: {
      priceList: PriceListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.priceList.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const priceListPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PriceListDeletePopupComponent,
    resolve: {
      priceList: PriceListResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'entityAuditingApp.priceList.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
