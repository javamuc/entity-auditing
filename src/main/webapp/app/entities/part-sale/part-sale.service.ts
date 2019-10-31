import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPartSale } from 'app/shared/model/part-sale.model';

type EntityResponseType = HttpResponse<IPartSale>;
type EntityArrayResponseType = HttpResponse<IPartSale[]>;

@Injectable({ providedIn: 'root' })
export class PartSaleService {
  public resourceUrl = SERVER_API_URL + 'api/part-sales';

  constructor(protected http: HttpClient) {}

  create(partSale: IPartSale): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(partSale);
    return this.http
      .post<IPartSale>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(partSale: IPartSale): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(partSale);
    return this.http
      .put<IPartSale>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IPartSale>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPartSale[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(partSale: IPartSale): IPartSale {
    const copy: IPartSale = Object.assign({}, partSale, {
      createdAt: partSale.createdAt != null && partSale.createdAt.isValid() ? partSale.createdAt.toJSON() : null,
      lastUpdatedAt: partSale.lastUpdatedAt != null && partSale.lastUpdatedAt.isValid() ? partSale.lastUpdatedAt.toJSON() : null
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
      res.body.forEach((partSale: IPartSale) => {
        partSale.createdAt = partSale.createdAt != null ? moment(partSale.createdAt) : null;
        partSale.lastUpdatedAt = partSale.lastUpdatedAt != null ? moment(partSale.lastUpdatedAt) : null;
      });
    }
    return res;
  }
}
