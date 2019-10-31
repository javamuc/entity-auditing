import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConditionDefinition } from 'app/shared/model/condition-definition.model';

type EntityResponseType = HttpResponse<IConditionDefinition>;
type EntityArrayResponseType = HttpResponse<IConditionDefinition[]>;

@Injectable({ providedIn: 'root' })
export class ConditionDefinitionService {
  public resourceUrl = SERVER_API_URL + 'api/condition-definitions';

  constructor(protected http: HttpClient) {}

  create(conditionDefinition: IConditionDefinition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conditionDefinition);
    return this.http
      .post<IConditionDefinition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(conditionDefinition: IConditionDefinition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(conditionDefinition);
    return this.http
      .put<IConditionDefinition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IConditionDefinition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IConditionDefinition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(conditionDefinition: IConditionDefinition): IConditionDefinition {
    const copy: IConditionDefinition = Object.assign({}, conditionDefinition, {
      createdAt:
        conditionDefinition.createdAt != null && conditionDefinition.createdAt.isValid() ? conditionDefinition.createdAt.toJSON() : null,
      lastUpdatedAt:
        conditionDefinition.lastUpdatedAt != null && conditionDefinition.lastUpdatedAt.isValid()
          ? conditionDefinition.lastUpdatedAt.toJSON()
          : null
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
      res.body.forEach((conditionDefinition: IConditionDefinition) => {
        conditionDefinition.createdAt = conditionDefinition.createdAt != null ? moment(conditionDefinition.createdAt) : null;
        conditionDefinition.lastUpdatedAt = conditionDefinition.lastUpdatedAt != null ? moment(conditionDefinition.lastUpdatedAt) : null;
      });
    }
    return res;
  }
}
