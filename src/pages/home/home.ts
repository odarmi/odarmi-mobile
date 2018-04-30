
import { CalendarComponent } from "../../components/calendar/calendar.component";

import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { NavController, Slides, ModalController } from 'ionic-angular';
import * as moment from "moment";
import { MoodProvider } from "../../providers/mood/mood.provider";
import { CreateMoodComponent } from "../../components/mood/create-mood/create-mood.component";
import { Mood } from "../../components/mood/mood.model";


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

  moods: Mood[];
  moodsToday: Mood[];

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController,
              private moodService: MoodProvider,
              public modalController: ModalController) {
    this.date = moment();
    
    this.prevDate = this.date.clone();
    this.prevDate.subtract(1, "M");

    this.nextDate = this.date.clone();
    this.nextDate.add(1, "M");

    this.month = this.date.format("MMMM");
    this.year = this.date.format("YYYY");
    // this.slides.slideTo(2);
  }

  async ngOnInit() {
    let res = await this.moodService.getMoods();
    this.moods = res.data;
    this.moods.sort((a, b) => {
      if (moment(a.beginTime).isAfter(moment(b.beginTime))) {
        return -1;
      }
      return 1;
    });
    this.moodsToday = this.moods.filter((mood) => {
      return moment(mood.beginTime).isSame(moment(), "day") ||
              moment(mood.endTime).isSame(moment(), "day");
    });
    console.log(this.moods[0]);
    console.log(this.moodsToday);
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

  addMood() {
    let modal = this.modalController.create(CreateMoodComponent, {});
    modal.present();
  }

}
