import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [
		CalendarComponent
	],
	imports: [
		CommonModule,
		IonicModule.forRoot(CalendarComponent)
	],
	exports: [
		CalendarComponent
	]	
})
export class CalendarModule {}
