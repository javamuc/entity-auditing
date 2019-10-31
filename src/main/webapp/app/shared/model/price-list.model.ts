import { Moment } from 'moment';
import { IConditionDefinition } from 'app/shared/model/condition-definition.model';
import { IDeduction } from 'app/shared/model/deduction.model';
import { IPartSale } from 'app/shared/model/part-sale.model';
import { IPrice } from 'app/shared/model/price.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IPriceList {
  id?: string;
  validFrom?: Moment;
  validTill?: Moment;
  type?: string;
  createdBy?: string;
  createdAt?: Moment;
  lastUpdatedBy?: string;
  lastUpdatedAt?: Moment;
  conditions?: IConditionDefinition[];
  deductions?: IDeduction[];
  partSales?: IPartSale[];
  prices?: IPrice[];
  customer?: ICustomer;
}

export class PriceList implements IPriceList {
  constructor(
    public id?: string,
    public validFrom?: Moment,
    public validTill?: Moment,
    public type?: string,
    public createdBy?: string,
    public createdAt?: Moment,
    public lastUpdatedBy?: string,
    public lastUpdatedAt?: Moment,
    public conditions?: IConditionDefinition[],
    public deductions?: IDeduction[],
    public partSales?: IPartSale[],
    public prices?: IPrice[],
    public customer?: ICustomer
  ) {}
}
