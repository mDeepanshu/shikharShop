import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.css'],
})
export class TableCardComponent implements OnInit, OnDestroy {
  constructor(
    private mainService: MainServiceService,
    private router: Router
  ) {}
  total;
  @Input() number;
  @Input() space;
  @Output() clossing = new EventEmitter<string>();
  startTime;
  timeActive;
  componentClosed = false;

  ngOnInit() {
    if (localStorage.getItem(`startTime/${this.space}/${this.number}`)) {
      console.log('in if');
      this.startTime = JSON.parse(
        localStorage.getItem(`startTime/${this.space}/${this.number}`)
      );
      localStorage.removeItem(`startTime/${this.space}/${this.number}`);
    } else {
      this.startTime = new Date().getTime() / 1000;
    }
    this.timeActive = Math.round(new Date().getTime() / 1000 - this.startTime);
    this.updateTime();
    if (this.space == 'custom') {
      this.total =
        this.mainService.amount[this.space][
          this.mainService.parentTab.custom.indexOf(this.number)
        ];
    } else {
      this.total = this.mainService.amount[this.space][this.number - 1];
    }
  }
  close() {
    this.mainService.deleteTable(this.space, this.number - 1);
    this.componentClosed = true;
    localStorage.removeItem(`startTime/${this.space}/${this.number}`);
    this.clossing.emit(this.number);
  }
  updateTime() {
    setTimeout(() => {
      if (this.total > 0) {
        this.timeActive += 1;
      }
      this.updateTime();
    }, 1000);
  }
  print() {
    this.mainService.save_and_print(this.number - 1, this.space).then(() => {
      this.total = 0;
    });
  }
  view() {
    this.router.navigate(['purchase']);
    this.mainService.onSpace = this.space;
    this.mainService.onLink = 1;
    if (this.space == 'custom') {
      this.mainService.selected = this.mainService.parentTab.custom.indexOf(
        this.number
      );
    } else {
      this.mainService.selected = this.number - 1;
    }
  }
  ngOnDestroy() {
    if (!this.componentClosed && this.total > 0) {
      localStorage.setItem(
        `startTime/${this.space}/${this.number}`,
        JSON.stringify(this.startTime)
      );
    }
  }
}
