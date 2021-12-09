import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css'],
})
export class PrintPageComponent implements OnInit {
  constructor(private mainService: MainServiceService) {}

  d = new Date();
  date;
  total_qua;
  sub_total;
  total;
  itemDetails;
  ngOnInit() {
    this.date = `${this.d.getDate()}/${
      this.d.getMonth() + 1
    }/${this.d.getFullYear()}`;
    this.mainService.printArray.subscribe((data) => {
      console.log(data);
      this.itemDetails = data.items;
      this.total = data.amount;
    });
  }
}
