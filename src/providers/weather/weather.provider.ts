import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from "axios";

import { config } from "../../config/default";
import { Mood } from '../../components/mood/mood.model';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

/*
  Generated class for the MoodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherProvider {
    serverConfig: any;

    constructor(
        private geolocationService: Geolocation
    ) {
        this.serverConfig = config.server;
    }

    async getWeather(location?: Geoposition): Promise<AxiosResponse> {
        if (!location) {
            location = await this.geolocationService.getCurrentPosition();
        }
        let url = `${this.serverConfig.host}/weather/forecast/API_KEY/${location.coords.latitude},${location.coords.longitude}`;
        let weather = await axios.get(url);
        return weather;
    }

}
