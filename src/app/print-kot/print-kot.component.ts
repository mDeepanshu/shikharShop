import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-print-kot',
  templateUrl: './print-kot.component.html',
  styleUrls: ['./print-kot.component.css'],
})
export class PrintKotComponent implements OnInit {
  constructor(private mainService: MainServiceService) {}
  itemDetails;
  ngOnInit() {
    console.log('pppppppppppppp');

    this.mainService.kotPrintArray.subscribe((data) => {
      console.log('pppppppppppppp');
      console.log(data);
      console.log(this.itemDetails);
      this.itemDetails = data;
    });
  }
}
