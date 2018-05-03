import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from "axios";

import { config } from "../../config/default";
import { Mood } from '../../components/mood/mood.model';

/*
  Generated class for the MoodProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoodProvider {

  serverConfig: any;

  moods: Mood[];

  constructor() {
    console.log('Hello MoodProvider Provider');
    this.serverConfig = config.server;
    console.log(`Server config: ${JSON.stringify(this.serverConfig)}`);
    this.moods = [];
  }

  async fetchMoods(): Promise<void> {
    let url = `${this.serverConfig.host}/moods`;
    console.log(`url: ${url}`);
    let res = await axios.get(url);
    this.moods = res.data;
  }

  async getMoods(): Promise<Mood[]> {
    if (this.moods.length === 0) {
      await this.fetchMoods();
    }

    return this.moods;
  }

  async addMood(mood: Mood): Promise<AxiosResponse> {
    let url = `${this.serverConfig.host}/moods`;
    try {
      let res = await axios.post(url, mood);
      return res;
    }
    catch(err) {
      console.error(err);
    }

  }

  async predictMood(mood: Mood): Promise<AxiosResponse> {
    let url = `${this.serverConfig.host}/predict`;
    try {
      let res = await axios.post(url, mood);
      return res;
    }
    catch(err) {
      console.error(err);
    }
  }

}
