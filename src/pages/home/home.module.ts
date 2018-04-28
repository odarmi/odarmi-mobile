import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { CalendarModule } from '../../components/calendar/calendar.module';
import { CreateMoodModule } from '../../components/mood/create-mood/create-mood.module';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    CalendarModule,
    CreateMoodModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
