import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { CalendarModule } from '../../components/calendar/calendar.module';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    CalendarModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
