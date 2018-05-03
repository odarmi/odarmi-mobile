import { Component, Input, SimpleChanges, OnInit, OnChanges, EventEmitter, Output } from '@angular/core';
import * as moment from "moment";
import { Slides } from 'ionic-angular';
import { MoodProvider } from '../../providers/mood/mood.provider';
import { Mood } from '../mood/mood.model';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnChanges, OnInit {

  today: moment.Moment;
  month: string;
  year: string;

  @Input() date: moment.Moment;
  @Input() slides: Slides;

  @Output() dayChange: EventEmitter<moment.Moment>;

  moods: Mood[];

  // History of moods (array of array of moods).
  // This array will always be of length 35 (7 x 5)
  moodHistory: Mood[][];

  // Array of dates.
  // This array will always be of length 35 (7 x 5)
  calendarDays: moment.Moment[];

  // Header row of calendar
  calendarHeaderRow: moment.Moment[];

  calendarRowIndices: number[];
  calendarColIndices: number[];

  constructor(
    private moodProvider: MoodProvider
  ) {
    this.dayChange = new EventEmitter<moment.Moment>();

    this.moodHistory = new Array(35).fill(null);
    this.calendarDays = new Array(35).fill(null);
    this.calendarHeaderRow = new Array(7).fill(null);
    this.calendarRowIndices = new Array(5).fill(0);
    this.calendarRowIndices.forEach((val, i) => { this.calendarRowIndices[i] = i });
    this.calendarColIndices = new Array(7).fill(0);
    this.calendarColIndices.forEach((val, i) => { this.calendarColIndices[i] = i });
  }

  async ngOnInit() {
    this.today = moment();

    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");
    this.loadCalendarHeaderRow();
    this.loadCalendarDays();
    this.loadMoodsForMonth();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.date = changes.date.currentValue;
    this.refreshDate();
  }

  refreshDate() {
    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");
    this.loadCalendarDays();
    this.loadMoodsForMonth();
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

  async loadMoodsForMonth() {
    let allMoods = await this.moodProvider.getMoods();
    this.moods = allMoods.filter((mood) => {
      return moment(mood.beginTime).isSame(this.date, "month");
    });
    // console.log(this.moods);
    this.calendarDays.forEach((day, i) => {
      this.moodHistory[i] = this.moods.filter((mood) => {
        return moment(mood.beginTime).isSame(day, "day");
      });
    });
    // console.log(this.moodHistory);
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

  averageMood(rowIndex: number, colIndex: number) {
    let sum = 0;
    let num = 0;
    if (!this.moodHistory[rowIndex * 7 + colIndex]) {
      return 0;
    }
    this.moodHistory[rowIndex * 7 + colIndex].forEach((mood) => {
      sum += mood.mood;
      num += 1;
    });

    let avg = sum / num;
    // console.log(avg);
    return avg;
  }

  getMoodClass(rowIndex: number, colIndex: number) {
    let averageMood = this.averageMood(rowIndex, colIndex);
    // console.log(averageMood);
    // 1-2
    if (!averageMood) {
      return "";
    }

    if (averageMood == 1) {
      return "mood_low";
    }
    else if (averageMood > 1 && averageMood < 2) {
      return "mood_medium-low";
    }

    else if (averageMood >= 2 && averageMood < 3) {
      return "mood_medium";
    }

    else if (averageMood >=3 && averageMood < 4) {
      return "mood_medium-high";
    }

    else {
      return "mood_high";
    }
  }

  selectDay(rowIndex: number, colIndex: number) {
    let newDate = this.getDateFromIndex(rowIndex, colIndex);
    this.date = newDate;
    this.dayChange.emit(newDate);
  }



}
