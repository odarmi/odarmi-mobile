import { Component, Input, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import * as moment from "moment";

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent implements OnChanges, OnInit {

  month: string;
  year: string;

  @Input() date: moment.Moment;

  constructor() {
    // if (!this.date) {
    //   this.date = moment();
    // }
    
  }

  ngOnInit() {
    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");
  }

  ngOnChanges(changes: SimpleChanges) {
    this.date = changes.date.currentValue;
    this.refreshDate();
  }

  refreshDate() {
    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");
  }

}
