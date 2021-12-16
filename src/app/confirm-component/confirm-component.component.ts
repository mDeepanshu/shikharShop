import { Component, OnInit, Inject } from '@angular/core';
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
  radioValue;
  initAmount;
  ngOnInit() {
    // console.log(this.data);
    this.initAmount = this.data.amount;
  }
  onNoClick(): void {
    // console.log(this.data);
    this.dialogRef.close();
  }
  radioChange(val) {
    console.log(val);
    this.radioValue = val;
  }
  onValInp(val) {
    if (this.radioValue == 'flat') {
      this.data.discount = this.initAmount - val;
    } else if (this.radioValue == 'percent') {
      this.data.discount = this.initAmount - (val / 100) * this.initAmount;
    }
  }
}
