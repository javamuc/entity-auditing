import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPriceList } from 'app/shared/model/price-list.model';

type EntityResponseType = HttpResponse<IPriceList>;
type EntityArrayResponseType = HttpResponse<IPriceList[]>;

@Injectable({ providedIn: 'root' })
export class PriceListService {
  public resourceUrl = SERVER_API_URL + 'api/price-lists';

  constructor(protected http: HttpClient) {}

  create(priceList: IPriceList): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(priceList);
    return this.http
      .post<IPriceList>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(priceList: IPriceList): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(priceList);
    return this.http
      .put<IPriceList>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IPriceList>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPriceList[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(priceList: IPriceList): IPriceList {
    const copy: IPriceList = Object.assign({}, priceList, {
      validFrom: priceList.validFrom != null && priceList.validFrom.isValid() ? priceList.validFrom.format(DATE_FORMAT) : null,
      validTill: priceList.validTill != null && priceList.validTill.isValid() ? priceList.validTill.format(DATE_FORMAT) : null,
      createdAt: priceList.createdAt != null && priceList.createdAt.isValid() ? priceList.createdAt.toJSON() : null,
      lastUpdatedAt: priceList.lastUpdatedAt != null && priceList.lastUpdatedAt.isValid() ? priceList.lastUpdatedAt.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validFrom = res.body.validFrom != null ? moment(res.body.validFrom) : null;
      res.body.validTill = res.body.validTill != null ? moment(res.body.validTill) : null;
      res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
      res.body.lastUpdatedAt = res.body.lastUpdatedAt != null ? moment(res.body.lastUpdatedAt) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((priceList: IPriceList) => {
        priceList.validFrom = priceList.validFrom != null ? moment(priceList.validFrom) : null;
        priceList.validTill = priceList.validTill != null ? moment(priceList.validTill) : null;
        priceList.createdAt = priceList.createdAt != null ? moment(priceList.createdAt) : null;
        priceList.lastUpdatedAt = priceList.lastUpdatedAt != null ? moment(priceList.lastUpdatedAt) : null;
      });
    }
    return res;
  }
}
