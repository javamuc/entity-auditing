import { Moment } from 'moment';
import { IPriceList } from 'app/shared/model/price-list.model';

export interface IPartSale {
  id?: string;
  name?: string;
  price?: number;
  createdBy?: string;
  createdAt?: Moment;
  lastUpdatedBy?: string;
  lastUpdatedAt?: Moment;
  priceList?: IPriceList;
}

export class PartSale implements IPartSale {
  constructor(
    public id?: string,
    public name?: string,
    public price?: number,
    public createdBy?: string,
    public createdAt?: Moment,
    public lastUpdatedBy?: string,
    public lastUpdatedAt?: Moment,
    public priceList?: IPriceList
  ) {}
}
