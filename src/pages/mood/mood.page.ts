import { CalendarComponent } from "../../components/calendar/calendar.component";

import { Component, Input, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NavController, Slides, ModalController, NavParams } from 'ionic-angular';
import * as moment from "moment";
import { MoodProvider } from "../../providers/mood/mood.provider";
import { CreateMoodComponent } from "../../components/mood/create-mood/create-mood.component";
import { Mood } from "../../components/mood/mood.model";

import { AndroidPermissions } from "@ionic-native/android-permissions";

import { } from "@types/googlemaps";
import { PlacesProvider } from "../../providers/places/places.provider";


@Component({
  selector: 'mood-page',
  templateUrl: 'mood.page.html'
})
export class MoodPage implements OnInit {

  mood: Mood;

  @ViewChild("gmap") gmap: ElementRef;
  map: any;

  constructor(
    private navParams: NavParams,
    private placesProvider: PlacesProvider
  ) {
    console.log(navParams);
    this.mood = this.navParams.get("mood");
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  async loadMap() {
    let place = await this.placesProvider.textSearch(this.mood.address);
    console.log(place);
    let location = {
      lat: place[0].geometry.location.lat(),
      lng: place[0].geometry.location.lng()
    };
    console.log(location);
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
  }

  async ngOnInit() {

  }
}
