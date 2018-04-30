import moment, { Moment } from "moment";
import { PlacesProvider } from "../../providers/places/places.provider";

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
  public userId: number;

  public name: string;
  public beginTime: string;
  public endTime: string;
  public placeId: string;
  public activity: string;
  public weather: string;
  public mood: MoodTypes;

  // ML Data
  public address: string;
  public category: string;
  public locationName: string;

  constructor() {
    this.userId = 1;
  }

  /**
   * Fills the machine learning data with the data from the place id.
   */
  fillPlaceData(placeDetails: google.maps.places.PlaceResult) {
    this.address = placeDetails.formatted_address;
    this.category = placeDetails.types[0];
    this.locationName = placeDetails.name;
  }
}

export { Mood, MoodTypes, ActivityTypes };
