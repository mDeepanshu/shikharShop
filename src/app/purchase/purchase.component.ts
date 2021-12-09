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
import { ConfirmComponentComponent } from '../confirm-component/confirm-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  constructor(
    private mainService: MainServiceService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  @ViewChild('tableLabel') tableLabel: ElementRef;

  purchaseForm: FormGroup;
  selected = new FormControl(0);
  amount = 0;
  kotPrint = [];
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
    this.kotPrint.push(true);
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
      billNo: `${Date.now().toString(36)}`,
      date: new Date(),
      items: this.arraySqr[this.selected.value],
      amount: this.amount,
    };
    this.mainService.printArray.next(this.purchaseDetail);
    const dialogRef = this.dialog.open(ConfirmComponentComponent, {
      width: '550px',
      height: '300px',
      data: this.purchaseDetail,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.mainService.toPrintKot.next(false);
        this.mainService.addPurchase(this.purchaseDetail).then((data) => {
          window.print();
        });
      }
    });
  }
  resetForm() {
    this.purchaseForm.patchValue({
      item_name: null,
      rate: null,
    });
  }
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
  printKot() {
    for (let i = 0; i < this.kotPrint.length; i++) {
      this.kotPrint[i] = false;
    }
    this.mainService.toPrintKot.next(true);
    setTimeout(() => {
      window.print();
    }, 0);
  }
}
