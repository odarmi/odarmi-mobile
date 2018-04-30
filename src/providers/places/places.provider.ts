import { Injectable } from "@angular/core";
import axios, { AxiosRequestConfig } from "axios";
import { Geoposition, Geolocation } from "@ionic-native/geolocation";

/**
 * This service is a wrapper for the Google Places API.
 */

@Injectable()
export class PlacesProvider {
  placesService: google.maps.places.PlacesService;
  autocompleteService: google.maps.places.AutocompleteService;

  baseUrl = "https://maps.googleapis.com/maps/api/place";
  apiKey = "AIzaSyCm3vd7ZTg2Q0fkbBZdF_rzS-oQoom7OFg";

  baseParams = {
    key: this.apiKey
  };

  // Radius in meters to search nearby places
  defaultRadius = 500;

  serverConfig: any;

  constructor(
    private geolocationService: Geolocation
  ) {
    console.log('Hello Places Provider');
    this.placesService = new google.maps.places.PlacesService(document.createElement("div"));
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  isAutocompletePrediction(data: any): data is google.maps.places.AutocompletePrediction {
    return data.matched_substrings !== undefined;
  } 

  async placeSearch(position?: Geoposition): Promise<google.maps.places.PlaceResult[]> {
    if (!position) {
      position = await this.geolocationService.getCurrentPosition();
    }
    return await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
      let request: google.maps.places.PlaceSearchRequest = {
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        radius: this.defaultRadius
      }
      this.placesService.nearbySearch(request, (results, status) => {
        resolve(results);
      });
    });
  }

  async placeAutocomplete(input:string, position?: Geoposition): Promise<google.maps.places.AutocompletePrediction[]> {
    if (!position) {
      position = await this.geolocationService.getCurrentPosition();
    }
    return new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
      let request: google.maps.places.AutocompletionRequest = {
        input: input,
        location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        radius: this.defaultRadius
      };
      this.autocompleteService.getPlacePredictions(request, (results, status) => {
        resolve(results);
      });
    });
  }

  getDetails(placeId: string): Promise<google.maps.places.PlaceResult> {
    return new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
      let request: google.maps.places.PlaceDetailsRequest = {
        placeId: placeId
      }
      this.placesService.getDetails(request, (results, status) => {
        resolve(results);
      });
    });
  }

}
