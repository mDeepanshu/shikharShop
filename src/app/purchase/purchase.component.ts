import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseTable } from '../models/purchaseTable.model';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  constructor(private mainService: MainServiceService) {}
  purchaseForm: FormGroup | any;
  public timer: any;
  partyOptions: any;
  itemOptions: any[] = [];
  tableArr: PurchaseTable[] = [];
  solar: boolean = true;
  ngOnInit() {
    this.purchaseForm = new FormGroup({
      item_name: new FormControl(null, Validators.required),
      rate: new FormControl(null, Validators.required),
      quantity: new FormControl(1, Validators.required),
      to_exp: new FormControl(null, Validators.required),
    });
  }
  addNew() {
    // this.tableArr.push(this.purchaseForm.value.setTwo);
  }
  onSubmit() {
    // this.purchaseDetail = this.purchaseForm.value.setOne;
    // this.purchaseDetail.items = this.tableArr;
    // let obj = {
    //   bill_no: '',
    //   date: new Date(),
    //   partyId: this.selectedId,
    // };
    // Object.assign(obj, this.purchaseDetail);
    // Object.assign(obj, this.purchaseForm.value.setThree);
    // obj.bill_no = Date.now().toString(36);
    // console.log(obj);
    // // this.mainService.addPurchase(obj).then((data) => {
    // //   this._snackBar.open('Purchase Saved', 'Close');
    // // });
    // this.printIt();
  }
  calculate() {
    // let objOne = this.purchaseForm.value.setOne;
    // let billTotal = 0;
    // let totalBag = 0;
    // this.tableArr.forEach((element) => {
    //   billTotal =
    //     Number(billTotal) +
    //     Math.round(Number(element.quantity) * Number(element.rate));
    //   totalBag = Number(totalBag) + Number(element.bag);
    // });
    // console.log(objOne.commission_rate, billTotal);
    // this.hammaliCalculated = Math.round(totalBag * this.hammaliRate);
    // this.bhadaCalculated = Math.round(totalBag * objOne.bhada_rate);
    // this.purchaseForm.patchValue({
    //   setOne: {
    //     hammali: this.hammaliCalculated,
    //     bhada: this.bhadaCalculated,
    //     tax: Math.round(totalBag * this.taxRate),
    //     commission: Math.round((objOne.commission_rate / 100) * billTotal),
    //   },
    // });
    // let total_exp =
    //   this.bhadaCalculated +
    //   Math.round((objOne.commission_rate / 100) * billTotal) +
    //   objOne.driver +
    //   objOne.station_charge +
    //   this.hammaliCalculated +
    //   Math.round(totalBag * this.taxRate) +
    //   objOne.cash;
    // this.purchaseForm.patchValue({
    //   setThree: {
    //     bill_total: billTotal,
    //     to_exp: total_exp,
    //     net_amount: billTotal - total_exp,
    //   },
    // });
  }
  resetForm() {}
  partyName(name: any) {}
  onPartySelect(name: any, id: any) {}
  itemName(name: String) {
    clearTimeout(this.timer);
    this.itemOptions = [];
    this.timer = setTimeout(() => {
      this.mainService.autoCompleteItemName(name).then((arr: any) => {
        console.log('arrarrarr', arr);
        this.itemOptions = arr;
      });
    }, 500);
  }
  removeItem(i: Number) {}
}
