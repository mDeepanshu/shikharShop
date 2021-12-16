import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-check-bills',
  templateUrl: './check-bills.component.html',
  styleUrls: ['./check-bills.component.css'],
})
export class CheckBillsComponent implements OnInit {
  constructor(
    private mainService: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}
  campaignOne: FormGroup;
  array;
  ngOnInit() {
    this.campaignOne = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });
  }
  fetchBills() {
    this.mainService
      .getBillbyDate(this.campaignOne.value.start, this.campaignOne.value.end)
      .then((data) => {
        // this._snackBar.open('Bill Saved', 'Close');
        this.array = data;
        // console.log(data);
      });
  }
}
