import { NgModule } from "@angular/core";
import { CreateMoodComponent } from "./create-mood.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { PlacesSearchModule } from "../../places/places-search/places-search.module";


@NgModule({
	declarations: [
		CreateMoodComponent
	],
	imports: [
		CommonModule,
		IonicModule.forRoot(CreateMoodComponent),
		PlacesSearchModule
	],
	exports: [
		CreateMoodComponent
	]	
})
export class CreateMoodModule {};
