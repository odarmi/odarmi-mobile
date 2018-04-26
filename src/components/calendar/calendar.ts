import { Component, Input, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import * as moment from "moment";
import { Slides } from 'ionic-angular';
import { TimeoutDebouncer } from 'ionic-angular/util/debouncer';

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

  today: moment.Moment;
  month: string;
  year: string;

  @Input() date: moment.Moment;
  @Input() slides: Slides;

  // Array of dates.
  // This array will always be of length 35 (7 x 5)
  calendarDays: moment.Moment[];

  // Header row of calendar
  calendarHeaderRow: moment.Moment[];

  calendarRowIndices: number[];
  calendarColIndices: number[];

  constructor() {
    // if (!this.date) {
    //   this.date = moment();
    // }
    this.today = moment();
    this.calendarDays = new Array(35).fill(null);
    this.calendarHeaderRow = new Array(7).fill(null);
    this.calendarRowIndices = new Array(5).fill(0);
    this.calendarRowIndices.forEach((val, i) => { this.calendarRowIndices[i] = i });
    this.calendarColIndices = new Array(7).fill(0);
    this.calendarColIndices.forEach((val, i) => { this.calendarColIndices[i] = i });
  }

  ngOnInit() {
    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");
    this.loadCalendarHeaderRow();
    this.loadCalendarDays();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.date = changes.date.currentValue;
    this.refreshDate();
  }

  refreshDate() {
    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");
    this.loadCalendarDays();
  }

  loadCalendarHeaderRow() {
    for (let i = 0; i < this.calendarHeaderRow.length; ++i) {
      this.calendarHeaderRow[i] = moment().day(i);
    } 
  }

  loadCalendarDays() {
    // Get the first day of the month.
    // First clone the date.
    let firstDayOfMonth = this.date.clone().startOf("month");

    // The first day of the week is our index into the calendar array.
    let dayOfWeek = firstDayOfMonth.day();

    this.calendarDays[dayOfWeek] = firstDayOfMonth;

    // Now copy all previous days from last month
    for (let i = dayOfWeek - 1; i >= 0; --i)
    {
      this.calendarDays[i] = this.calendarDays[i + 1].clone().subtract(1, "day");
    }

    // Copy all future days
    for (let i = dayOfWeek + 1; i < this.calendarDays.length; ++i)
    {
      this.calendarDays[i] = this.calendarDays[i - 1].clone().add(1, "day");
    }
  }

  goToPrevMonth() {
    this.slides.slidePrev();
  }

  goToNextMonth() {
    this.slides.slideNext();
  }

  getDateFromIndex(rowIndex: number, colIndex: number): moment.Moment {
    return this.calendarDays[rowIndex * 7 + colIndex];
  }

 

}
