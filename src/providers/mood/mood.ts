import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from "axios";

import { config } from "../../config/default";

/*
  Generated class for the MoodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoodProvider {

  serverConfig: any;

  constructor() {
    console.log('Hello MoodProvider Provider');
    this.serverConfig = config.server;
    console.log(`Server config: ${JSON.stringify(this.serverConfig)}`);
  }

  async getMoods(): Promise<AxiosResponse> {
    let moods = await axios.get("http://localhost:3000/api/moods");
    return moods;
  }

}
