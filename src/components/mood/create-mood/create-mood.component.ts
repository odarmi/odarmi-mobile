import { Component, OnChanges, OnInit } from "@angular/core";
import { ViewController, ModalController, ToastController } from "ionic-angular";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import moment from "moment";
import { PlacesProvider } from "../../../providers/places/places.provider";
import { Mood } from "../mood.model";
import { PlacesSearchComponent } from "../../places/places-search/places-search.component";
import { MoodProvider } from "../../../providers/mood/mood.provider";
import { WeatherProvider } from "../../../providers/weather/weather.provider";
import { } from "@types/googlemaps";

@Component({
    selector: "create-mood",
    templateUrl: 'create-mood.component.html'
  })
  export class CreateMoodComponent implements OnChanges, OnInit {

    newMood: Mood;
    location: Geoposition;
    currentWeather: any;

    predictedMood: number;

    defaultPeople = [
      "Allen Wang",
      "Allen Yu",
      "Ben Fu",
      "Dad",
      "Daniel Li",
      "Daniel Jee",
      "Danny Vo",
      "Drew Vogelsang",
      "Ethan Ho",
      "Haisun Banh",
      "Isabel Chang",
      "Jason Cheung",
      "Josh Nam",
      "Keith Wong",
      "Kenneth Chow",
      "Kevin Zeng",
      "Melissa Tung",
      "Mom",
      "Penny Lan",
      "Sharon Yu",
      "Spencer Lan",
      "Stacy Lan"
    ]

    constructor(public viewController: ViewController,
                public modalController: ModalController,
                private geolocation: Geolocation,
                private placesProvider: PlacesProvider,
                private moodProvider: MoodProvider,
                private weatherProvider: WeatherProvider,
                private toastController: ToastController
    ) {

    }

    async ngOnInit() {
      this.newMood = new Mood();
      this.newMood.mood = 3;
      this.newMood.beginTime = moment().format();
      this.newMood.endTime = moment().add(0.5, "hour").format();

      let places = await this.placesProvider.placeSearch();
      this.newMood.locationName = places[0].name;
      this.newMood.placeId = places[0].place_id;
      this.fillPlaceData();

      // set the weather
      let response = await this.weatherProvider.getWeather();
      this.currentWeather = response.data.currently;
      this.newMood.weather = this.currentWeather.icon;

      this.predictMood();
      console.log(this.newMood.weather);
    }

    ngOnChanges(changes) {

    }

    dismiss() {
      this.viewController.dismiss();
    }

    openPlacesSearch() {
      let placesSearchModal = this.modalController.create(PlacesSearchComponent);
      placesSearchModal.onDidDismiss((data) => {
        console.log(data);
        if (data) {
          if (this.placesProvider.isAutocompletePrediction(data)) {
            this.newMood.locationName = data.description;
            this.newMood.placeId = data.place_id;
          }
          else {
            this.newMood.locationName = data.name;
            this.newMood.placeId = data.place_id;
          }
          this.fillPlaceData();
        }


      });
      placesSearchModal.present();
      console.log("Here");
    }

    async fillPlaceData() {
      let placeDetails = await this.placesProvider.getDetails(this.newMood.placeId);
      this.newMood.fillPlaceData(placeDetails);
    }

    async onSubmit() {
      await this.fillPlaceData();
      console.log(this.newMood);
      let res = await this.moodProvider.addMood(this.newMood);
      console.log(res);
      this.dismiss();
    }

    async predictMood() {
      console.log(this.newMood);
      let res = await this.moodProvider.predictMood(this.newMood);
      this.predictedMood = res.data[0];
      let toast = this.toastController.create({
        message: "Your predicted mood is " + this.predictedMood,
        duration: 3000
      });
      toast.present();
    }

  };
