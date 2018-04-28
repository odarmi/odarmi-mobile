import { NgModule } from "@angular/core";
import { CreateMoodComponent } from "./create-mood";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";


@NgModule({
	declarations: [
		CreateMoodComponent
	],
	imports: [
		CommonModule,
		IonicModule.forRoot(CreateMoodComponent)
	],
	exports: [
		CreateMoodComponent
	]	
})
export class CreateMoodModule {};
