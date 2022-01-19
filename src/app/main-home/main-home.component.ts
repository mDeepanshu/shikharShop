import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css'],
})
export class MainHomeComponent implements OnInit {
  constructor(public mainService: MainServiceService) {}
  @ViewChild('label') customNaming: ElementRef;

  ngOnInit() {}
  addTab(type) {
    this.rearrange_onAdd(type);
  }
  removeTab(type, pos) {
    this.mainService.parentTab[type].forEach((element) => {
      if (element == pos) {
        const index = this.mainService.parentTab[type].indexOf(pos);
        this.mainService.parentTab[type].splice(index, 1);
      }
    });
  }
  rearrange_onAdd(type) {
    if (type != 'custom') {
      let _len = this.mainService.parentTab[type].length;
      for (let i = 0; i < _len; i++) {
        if (this.mainService.parentTab[type][i] != i + 1) {
          this.mainService.parentTab[type].splice(i, 0, i + 1);
          this.mainService.amount[type].splice(i + 1, 0, 0);
          this.mainService.itemList_inSpace[type].kotPrint.splice(
            _len + 1,
            0,
            []
          );
          this.mainService.itemList_inSpace[type].arraySqr.splice(
            _len + 1,
            0,
            []
          );
          return i + 1;
        }
      }
      this.mainService.parentTab[type].splice(_len, 0, _len + 1);
      this.mainService.amount[type].splice(_len + 1, 0, 0);
      this.mainService.itemList_inSpace[type].kotPrint.splice(_len + 1, 0, []);
      this.mainService.itemList_inSpace[type].arraySqr.splice(_len + 1, 0, []);
      console.log(this.mainService.parentTab);

      return _len + 1;
    } else {
      this.customNaming.nativeElement.focus();
      this.mainService.parentTab.custom.push('new');
      this.mainService.amount.custom.push(0);
    }
  }
  custom_label_change(label) {
    this.mainService.parentTab.custom[
      this.mainService.parentTab.custom.length - 1
    ] = label;
  }
}
