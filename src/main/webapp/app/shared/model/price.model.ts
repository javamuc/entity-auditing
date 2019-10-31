import { Moment } from 'moment';
import { IPriceList } from 'app/shared/model/price-list.model';

export interface IPrice {
  id?: string;
  model?: string;
  condition?: string;
  price?: number;
  createdBy?: string;
  createdAt?: Moment;
  lastUpdatedBy?: string;
  lastUpdatedAt?: Moment;
  priceList?: IPriceList;
}

export class Price implements IPrice {
  constructor(
    public id?: string,
    public model?: string,
    public condition?: string,
    public price?: number,
    public createdBy?: string,
    public createdAt?: Moment,
    public lastUpdatedBy?: string,
    public lastUpdatedAt?: Moment,
    public priceList?: IPriceList
  ) {}
}
