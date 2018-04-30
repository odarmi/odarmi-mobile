import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "ionic-angular";
import { PlacesSearchComponent } from "./places-search.component";


@NgModule({
	declarations: [
		PlacesSearchComponent
	],
	imports: [
		CommonModule,
		IonicModule.forRoot(PlacesSearchComponent)
	],
	exports: [
		PlacesSearchComponent
	]	
})
export class PlacesSearchModule {};
