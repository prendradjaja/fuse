import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SlotComponent } from "./slot/slot.component";

export enum DieColor {
  red = "red",
  yellow = "yellow",
  green = "green",
  blue = "blue",
  black = "black"
}

export interface Die {
  color: DieColor;
  number: 1 | 2 | 3 | 4 | 5 | 6;
}

const ALL_BOMB_CARDS = [
  {
    items: "target.five, neq, target.five, eq, target.five",
    constraints: [
      "neq-color 1 2", //
      "eq-color 2 3"
    ]
  }
];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  @ViewChild("filledSlot")
  filledSlot: SlotComponent;

  ngOnInit(): void {
    this.filledSlot.placeDie({
      color: "yellow" as DieColor,
      number: 5
    });
  }
}
