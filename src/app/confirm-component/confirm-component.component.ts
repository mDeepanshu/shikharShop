import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-component',
  templateUrl: './confirm-component.component.html',
  styleUrls: ['./confirm-component.component.css'],
})
export class ConfirmComponentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  @ViewChild('finalAmount') disc_amount: ElementRef;
  radioValue;
  initAmount;
  confirmPafeInfo = {
    discount: this.data.discount,
    discountAmount: 0,
    discountType: ' this.data.discountType',
  };
  ngOnInit() {
    this.initAmount = this.data.amount;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  radioChange(val) {
    this.disc_amount.nativeElement.value = 0;
    this.radioValue = val;
  }
  onValInp(val) {
    if (this.radioValue == 'flat') {
      this.confirmPafeInfo.discount = this.initAmount - val;
      this.confirmPafeInfo.discountType = 'rs';
      this.confirmPafeInfo.discountAmount = val;
    } else if (this.radioValue == 'percent') {
      this.confirmPafeInfo.discount =
        this.initAmount - (val / 100) * this.initAmount;
      this.confirmPafeInfo.discountType = '%';
      this.confirmPafeInfo.discountAmount = val;
    }
  }
}
