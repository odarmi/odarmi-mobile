
import { CalendarComponent } from "../../components/calendar/calendar";

import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import * as moment from "moment";
import { MoodProvider } from "../../providers/mood/mood";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  date: moment.Moment;
  // Next month
  nextDate: moment.Moment;
  // Previous month
  prevDate: moment.Moment;
  month: string;
  year: string;

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              private moodService: MoodProvider) {
    this.date = moment();
    
    this.prevDate = this.date.clone();
    this.prevDate.subtract(1, "M");

    this.nextDate = this.date.clone();
    this.nextDate.add(1, "M");

    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");

    // this.slides.slideTo(2);
  }

  ngOnInit() {
    this.getMoods();
  }

  async getMoods() {
    let moods = [];
    try {
      let moods = await this.moodService.getMoods();
      console.log(`Moods: ${moods.data.length}`);
    }
    catch(err) {
      console.error(err);
    }
    return moods;
  }

  slideChanged() {
    let curIndex = this.slides.getActiveIndex();
    if (curIndex == 2) {
      this.goToNextMonth();
    }
    else if (curIndex == 0) {
      this.goToPrevMonth();
    }
    this.slides.slideTo(1, 0, false);
  }

  goToNextMonth() {
    console.log("Moving to next month...");

    this.date.add(1, "M");
    this.prevDate.add(1, "M");
    this.nextDate.add(1, "M");

    // We need to explicity assign the dates to invoke ngOnChanges()
    this.propagateDateChanges();
  }

  goToPrevMonth() {
    console.log("Moving to prev month...");
    
    this.date.subtract(1, "M");
    this.prevDate.subtract(1, "M");
    this.nextDate.subtract(1, "M");
    
    // We need to explicity assign the dates to invoke ngOnChanges()
    this.propagateDateChanges();
  }

  /**
   * Explicity clones and reassigns the date objects in order
   * to invoke ngOnChanges() in the child component.
   */
  propagateDateChanges() {
    this.date = this.date.clone();
    this.prevDate = this.prevDate.clone();
    this.nextDate = this.nextDate.clone();
  }

}
