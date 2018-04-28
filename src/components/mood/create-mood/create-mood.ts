import { Component, OnChanges, OnInit } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import { PlacesProvider } from "../../../providers/places/places";

@Component({
    selector: "create-mood",
    templateUrl: 'create-mood.html'
  })
  export class CreateMoodComponent implements OnChanges, OnInit {

    location: Geoposition;

    constructor(public viewController: ViewController,
                private geolocation: Geolocation,
                private placesProvider: PlacesProvider) {

    }

    async ngOnInit() {
      this.location = await this.geolocation.getCurrentPosition();
      console.log(this.location);
      let place = await this.placesProvider.placeSearch(this.location);
    }

    ngOnChanges(changes) {

    }

    dismiss() {
      this.viewController.dismiss();
    }

  };
