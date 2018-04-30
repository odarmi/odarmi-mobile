import { Component, OnChanges, OnInit } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Geolocation, Geoposition } from "@ionic-native/geolocation";
import moment from "moment";
import { PlacesProvider } from "../../../providers/places/places.provider";

@Component({
    selector: "places-search",
    templateUrl: 'places-search.component.html'
})
export class PlacesSearchComponent implements OnChanges, OnInit {

    location: Geoposition;
    input: string;

    // Autocomplete results
    placePredictions: google.maps.places.AutocompletePrediction[];
    nearbyPlaces: google.maps.places.PlaceResult[];

    constructor(public viewController: ViewController,
        private geolocation: Geolocation,
        private placesProvider: PlacesProvider) {
        this.input = "";
    }

    async ngOnInit() {
        this.location = await this.geolocation.getCurrentPosition();
        this.nearbyPlaces = await this.placesProvider.placeSearch(this.location);
        console.log(this.nearbyPlaces);
        // this.placePredictions = await this.placesProvider.placeAutocomplete(this.input, this.location);
    }

    ngOnChanges(changes) {

    }

    dismiss(data?: google.maps.places.AutocompletePrediction | google.maps.places.PlaceResult) {
        this.viewController.dismiss(data);
    }

    async onInput(event) {
        console.log(this.input);
        if (this.input) {
            this.placePredictions = await this.placesProvider.placeAutocomplete(this.input, this.location);
        }
        
        console.log(this.placePredictions);
    }

    onCancel(event) {
        console.log(event);
        this.dismiss();
    }

    selectPlace(prediction: google.maps.places.AutocompletePrediction | google.maps.places.PlaceResult) {
        this.dismiss(prediction);
    }

};
