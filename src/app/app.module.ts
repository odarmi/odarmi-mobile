import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from "@ionic-native/geolocation";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomePageModule } from '../pages/home/home.module';
import { CalendarModule } from '../components/calendar/calendar.module';
import { MoodProvider } from '../providers/mood/mood.provider';
import { UserProvider } from '../providers/user/user.provider';
import { PlacesProvider } from '../providers/places/places.provider';
import { WeatherProvider } from '../providers/weather/weather.provider';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HomePageModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MoodProvider,
    UserProvider,
    PlacesProvider,
    WeatherProvider,
    Geolocation,
    AndroidPermissions
  ]
})
export class AppModule {}
