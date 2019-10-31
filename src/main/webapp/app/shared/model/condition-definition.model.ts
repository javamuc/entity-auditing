import { Moment } from 'moment';
import { IPriceList } from 'app/shared/model/price-list.model';

export interface IConditionDefinition {
  id?: string;
  definition?: string;
  description?: string;
  createdBy?: string;
  createdAt?: Moment;
  lastUpdatedBy?: string;
  lastUpdatedAt?: Moment;
  priceList?: IPriceList;
}

export class ConditionDefinition implements IConditionDefinition {
  constructor(
    public id?: string,
    public definition?: string,
    public description?: string,
    public createdBy?: string,
    public createdAt?: Moment,
    public lastUpdatedBy?: string,
    public lastUpdatedAt?: Moment,
    public priceList?: IPriceList
  ) {}
}
