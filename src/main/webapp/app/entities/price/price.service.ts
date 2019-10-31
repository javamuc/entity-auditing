import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPrice } from 'app/shared/model/price.model';

type EntityResponseType = HttpResponse<IPrice>;
type EntityArrayResponseType = HttpResponse<IPrice[]>;

@Injectable({ providedIn: 'root' })
export class PriceService {
  public resourceUrl = SERVER_API_URL + 'api/prices';

  constructor(protected http: HttpClient) {}

  create(price: IPrice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(price);
    return this.http
      .post<IPrice>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(price: IPrice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(price);
    return this.http
      .put<IPrice>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IPrice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPrice[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(price: IPrice): IPrice {
    const copy: IPrice = Object.assign({}, price, {
      createdAt: price.createdAt != null && price.createdAt.isValid() ? price.createdAt.toJSON() : null,
      lastUpdatedAt: price.lastUpdatedAt != null && price.lastUpdatedAt.isValid() ? price.lastUpdatedAt.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
      res.body.lastUpdatedAt = res.body.lastUpdatedAt != null ? moment(res.body.lastUpdatedAt) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((price: IPrice) => {
        price.createdAt = price.createdAt != null ? moment(price.createdAt) : null;
        price.lastUpdatedAt = price.lastUpdatedAt != null ? moment(price.lastUpdatedAt) : null;
      });
    }
    return res;
  }
}
