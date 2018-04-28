import { Injectable } from "@angular/core";
import axios, { AxiosRequestConfig } from "axios";
import { Geoposition } from "@ionic-native/geolocation";
import GoogleMaps from "@google/maps";

/**
 * This service is a wrapper for the Google Places API.
 */

@Injectable()
export class PlacesProvider {
  googleMapsClient: any;

  baseUrl = "https://maps.googleapis.com/maps/api/place";
  apiKey = "AIzaSyCm3vd7ZTg2Q0fkbBZdF_rzS-oQoom7OFg";

  baseParams = {
    key: this.apiKey
  };

  // Radius in meters to search nearby places
  defaultRadius = 100;

  serverConfig: any;

  constructor() {
    console.log('Hello Places Provider');
    this.googleMapsClient = GoogleMaps.createClient({
      key: this.apiKey,
      Promise
    });
  }

  async placeSearch(position: Geoposition): Promise<Object> {
    let url = `${this.baseUrl}/nearbysearch/json`;
    let config: AxiosRequestConfig = {
      params: {
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        radius: this.defaultRadius
      }

    };
    config.params = Object.assign(config.params, this.baseParams);
    console.log(`config: ${JSON.stringify(config)}`);
    let places = await axios.get(url, config);
    return places;
  }

}
