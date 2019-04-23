import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CardComponent } from "./card/card.component";
import { SlotComponent } from "./slot/slot.component";
import { ItemInsertionPointDirective } from "./item-insertion-point.directive";
import { EqComponent } from "./eq/eq.component";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SlotComponent,
    ItemInsertionPointDirective,
    EqComponent
  ],
  imports: [BrowserModule],
  entryComponents: [SlotComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
