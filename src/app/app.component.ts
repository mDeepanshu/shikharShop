import { OnInit, Component } from '@angular/core';
import { MainServiceService } from './main-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Food Costa';
  toPrintKot = true;
  toPrintBill = true;
  login = false;
  constructor(private mainService: MainServiceService) {}
  ngOnInit() {
    this.mainService.toPrintKot.subscribe((value) => {
      this.toPrintKot = value;
    });
    this.mainService.toPrintBill.subscribe((value) => {
      this.toPrintBill = value;
    });
    this.mainService.login.subscribe((value) => {
      this.login = value;
    });
  }
}
