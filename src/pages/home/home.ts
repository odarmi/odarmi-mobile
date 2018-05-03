
import { CalendarComponent } from "../../components/calendar/calendar.component";

import { Component, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { NavController, Slides, ModalController } from 'ionic-angular';
import * as moment from "moment";
import { MoodProvider } from "../../providers/mood/mood.provider";
import { CreateMoodComponent } from "../../components/mood/create-mood/create-mood.component";
import { Mood } from "../../components/mood/mood.model";

import { AndroidPermissions } from "@ionic-native/android-permissions";

import { } from "@types/googlemaps";
import { MoodPage } from "../mood/mood.page";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  permissions = [
    this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
  ];

  calendarSlides = [
    {
      date: moment().startOf("month").subtract(1, "month")
    },
    {
      date: moment().startOf("month")
    },
    {
      date: moment().startOf("month").add(1, "month")
    }
  ];

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
              public modalController: ModalController,
              private androidPermissions: AndroidPermissions
  ) {
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
    // Get permissions
    let permissionPromises = this.permissions.map((permission) => {
      return this.androidPermissions.checkPermission(permission);
    });
    try {
      let res = await Promise.all(permissionPromises);
      res.forEach((result) => {
        console.log("Permissions granted.");
      });

    }
    catch(err) {
      this.androidPermissions.requestPermissions(this.permissions);
    }

    this.moods = await this.moodService.getMoods();
    this.moods.sort(this.compareMoodByBeginTime);
    this.moodsToday = this.moods.filter((mood) => {
      return moment(mood.beginTime).isSame(moment(), "day") ||
              moment(mood.endTime).isSame(moment(), "day");
    });

    // console.log(this.moods[0]);
    // console.log(this.moodsToday);
  }

  slideChanged() {
    let curIndex = this.slides.getActiveIndex();
    let prevIndex = this.slides.getPreviousIndex();

    // We slid to the next month, so add another slide at the end.
    if (this.slides.isEnd()) {
      console.log("end: " + curIndex);
      let curDate = this.calendarSlides[curIndex].date;
      this.calendarSlides.push({
        date: moment(curDate).add(1, "month")
      });
      this.calendarSlides.splice(0, 1);
      this.slides.slideTo(1, 0, false);
      // this.slides.update();
    }

    // We slid to the previous month
    else if (this.slides.isBeginning()) {
      console.log("beginning");
      let curDate = this.calendarSlides[curIndex].date;
      this.calendarSlides.unshift({
        date: moment(curDate).subtract(1, "month")
      });
      this.calendarSlides.splice(3, 1);
      this.slides.slideTo(1, 0, false);
    }
    // if (curIndex == 2) {
    //   this.goToNextMonth();
    // }
    // else if (curIndex == 0) {
    //   this.goToPrevMonth();
    // }
    // this.slides.slideTo(1, 0, false);
  }

  // goToNextMonth() {
  //   console.log("Moving to next month...");

  //   this.date.add(1, "M");
  //   this.prevDate.add(1, "M");
  //   this.nextDate.add(1, "M");

  //   // We need to explicity assign the dates to invoke ngOnChanges()
  //   this.propagateDateChanges();
  // }

  // goToPrevMonth() {
  //   console.log("Moving to prev month...");

  //   this.date.subtract(1, "M");
  //   this.prevDate.subtract(1, "M");
  //   this.nextDate.subtract(1, "M");

  //   // We need to explicity assign the dates to invoke ngOnChanges()
  //   this.propagateDateChanges();
  // }

  /**
   * Explicity clones and reassigns the date objects in order
   * to invoke ngOnChanges() in the child component.
   */
  // propagateDateChanges() {
  //   this.date = this.date.clone();
  //   this.prevDate = this.prevDate.clone();
  //   this.nextDate = this.nextDate.clone();
  // }
  compareMoodByBeginTime(a: Mood, b: Mood) {
    if (moment(a.beginTime).isBefore(moment(b.beginTime))) {
      return -1;
    }
    return 1;
  }

  refreshMoodsToday(date: moment.Moment) {
    console.log(date);
    this.moodsToday = this.moods.filter((mood) => {
      return moment(mood.beginTime).isSame(date, "day") ||
              moment(mood.endTime).isSame(date, "day");
    });
    this.moodsToday.sort(this.compareMoodByBeginTime);
    console.log(this.moodsToday);
  }

  addMood() {
    let modal = this.modalController.create(CreateMoodComponent, {});
    modal.present();
  }

  goToMood(mood: Mood) {
    this.navCtrl.push(MoodPage, {
      mood: mood
    });
  }

  onDayChange(newDate: moment.Moment) {
    this.refreshMoodsToday(newDate);
    console.log(newDate);
  }

}
