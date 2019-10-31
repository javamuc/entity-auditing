import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDeduction } from 'app/shared/model/deduction.model';

type EntityResponseType = HttpResponse<IDeduction>;
type EntityArrayResponseType = HttpResponse<IDeduction[]>;

@Injectable({ providedIn: 'root' })
export class DeductionService {
  public resourceUrl = SERVER_API_URL + 'api/deductions';

  constructor(protected http: HttpClient) {}

  create(deduction: IDeduction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deduction);
    return this.http
      .post<IDeduction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(deduction: IDeduction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(deduction);
    return this.http
      .put<IDeduction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IDeduction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDeduction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(deduction: IDeduction): IDeduction {
    const copy: IDeduction = Object.assign({}, deduction, {
      createdAt: deduction.createdAt != null && deduction.createdAt.isValid() ? deduction.createdAt.toJSON() : null,
      lastUpdatedAt: deduction.lastUpdatedAt != null && deduction.lastUpdatedAt.isValid() ? deduction.lastUpdatedAt.toJSON() : null
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
      res.body.forEach((deduction: IDeduction) => {
        deduction.createdAt = deduction.createdAt != null ? moment(deduction.createdAt) : null;
        deduction.lastUpdatedAt = deduction.lastUpdatedAt != null ? moment(deduction.lastUpdatedAt) : null;
      });
    }
    return res;
  }
}
