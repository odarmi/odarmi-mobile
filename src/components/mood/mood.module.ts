import { NgModule } from "@angular/core";
import { CreateMoodComponent } from "./create-mood/create-mood.component";
import { CommonModule } from "@angular/common";
import { IonicModule, IonicPageModule } from "ionic-angular";
import { PlacesSearchModule } from "../places/places-search/places-search.module";
import { MoodPage } from "../../pages/mood/mood.page";


@NgModule({
	declarations: [
    CreateMoodComponent,
    MoodPage
	],
	imports: [
    CommonModule,
    IonicPageModule.forChild(MoodPage),
		IonicModule.forRoot(CreateMoodComponent),
		PlacesSearchModule
	],
	exports: [
    CreateMoodComponent,
    MoodPage
	]
})
export class MoodModule {};
