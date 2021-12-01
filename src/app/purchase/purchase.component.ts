import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseTable } from '../models/purchaseTable.model';
import { MainServiceService } from '../main-service.service';
import { Purchase } from '../models/purchase.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  constructor(
    private mainService: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}
  @ViewChild('tableLabel') tableLabel: ElementRef;

  purchaseForm: FormGroup;
  selected = new FormControl(0);
  amount = 0;
  public timer: any;
  partyOptions: any;
  public purchaseDetail: Purchase;
  itemOptions: any[] = [];
  arraySqr: any[][] = [[], [], []];
  // tableArr: PurchaseTable[] = [];
  solar: boolean = true;
  tabs = ['1', '2', '3'];
  ngOnInit() {
    this.purchaseForm = new FormGroup({
      item_name: new FormControl(null, Validators.required),
      rate: new FormControl(null, Validators.required),
      quantity: new FormControl(1, Validators.required),
      // amount: new FormControl(null, Validators.required),
    });
  }
  addNew() {
    this.arraySqr[this.selected.value].push(this.purchaseForm.value);
    let total =
      this.amount +
      this.purchaseForm.value.rate * this.purchaseForm.value.quantity;
    console.log(total);
    // this.purchaseForm.patchValue({
    //   amount: total,
    // });
    this.amount = total;
    // this.purchaseForm.reset();
    this.purchaseForm.patchValue({
      item_name: null,
      rate: null,
    });
  }
  onSubmit() {
    this.purchaseDetail = {
      bill_no: Date.now().toString(36),
      date: new Date(),
      items: this.arraySqr[this.selected.value],
      amount: this.amount,
    };
    console.log(this.purchaseDetail);
    // this.purchaseDetail.items = this.arraySqr[this.selected.value];
    // let obj = {
    //   bill_no: '',
    //   date: new Date(),
    // };
    // Object.assign(obj, this.purchaseDetail);
    // obj.bill_no = Date.now().toString(36);
    // console.log(obj);
    this.mainService.addPurchase(this.purchaseDetail).then((data) => {
      this._snackBar.open('Bill Saved', 'Close');
    });
    // this.printIt();
  }
  calculate() {
    // this.purchaseForm.patchValue({
    //     to_exp: total,
    // });
  }
  resetForm() {}
  partyName(name) {}
  onPartySelect(rate) {
    console.log(rate);
    this.purchaseForm.patchValue({
      rate: rate,
    });
  }
  itemName(name) {
    clearTimeout(this.timer);
    this.itemOptions = [];
    this.timer = setTimeout(() => {
      this.mainService.autoCompleteItemName(name).then((arr: any) => {
        console.log('arrarrarr', arr);
        this.itemOptions = arr;
      });
    }, 500);
  }
  removeItem(i) {
    console.log(
      this.arraySqr[this.selected.value][i].rate,
      this.arraySqr[this.selected.value][i].quantity
    );

    let total =
      this.purchaseForm.value.to_exp -
      this.arraySqr[this.selected.value][i].rate *
        this.arraySqr[this.selected.value][i].quantity;
    this.purchaseForm.patchValue({
      to_exp: total,
    });
    //
    delete this.arraySqr[this.selected.value][i];
    this.arraySqr[this.selected.value].splice(i, 1);
  }
  addTab() {
    this.tabs.push(`${this.tabs.length + 1}`);
    this.arraySqr.push([]);
    // if (selectAfterAdding) {
    this.selected.setValue(this.tabs.length - 1);
    this.tableLabel.nativeElement.focus();

    // }
  }
  removeTab(index) {
    this.tabs.splice(index, 1);
  }
  changeTabName(name) {
    this.tabs[this.tabs.length - 1] = name;
  }
}
