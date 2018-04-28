import moment, { Moment } from "moment";

enum ActivityTypes {
  ""
};

enum MoodTypes {
  "Sad",
  "Bad",
  "Neutral",
  "Good",
  "Awesome"
};

class Mood {
  public name: string;
  public beginTime: moment.Moment;
  public endTime: moment.Moment;
  public locationId: string;
  public location: string;
  public activity: ActivityTypes;
  public mood: MoodTypes;

  constructor() {

  }
}

export { Mood, MoodTypes, ActivityTypes };
