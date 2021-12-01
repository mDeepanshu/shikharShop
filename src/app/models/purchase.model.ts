import { PurchaseTable } from './purchaseTable.model';
export interface Purchase {
  date: any;
  bill_no: String;
  amount: Number;
  items: PurchaseTable[];
}
