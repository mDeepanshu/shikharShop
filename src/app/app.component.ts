import { OnInit, Component } from '@angular/core';
import { MainServiceService } from './main-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ShikharShop';
  toPrintKot = false;
  constructor(private mainService: MainServiceService) {}
  ngOnInit() {
    this.mainService.toPrintKot.subscribe((value) => {
      this.toPrintKot = value;
      console.log(this.toPrintKot);
    });
  }
}
