import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SlotComponent } from "./slot/slot.component";
import { ItemsParserService } from "./items-parser.service";
import { ConstraintsParserService } from "./constraints-parser.service";
import { BombParserService } from "./bomb-parser.service";

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
    items: "target.rainbow, eq, target.rainbow, eq, target.rainbow",
    constraints: [
      "eq-color 1 2", //
      "eq-color 2 3"
    ]
  },
  {
    items: "target.rainbow, neq, target.rainbow",
    constraints: [
      "neq-color 1 2" //
    ]
  }
];

const DEMO_BOMB_CARDS = [
  // {
  //   items: "target.rainbow, eq, target.rainbow, eq, target.rainbow",
  //   constraints: [
  //     "eq-color 1 2", //
  //     "eq-color 2 3"
  //   ]
  // },
  {
    items: "target",
    constraints: []
  },
  {
    items: "target, target.rainbow",
    constraints: []
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

  demoBombCards = DEMO_BOMB_CARDS;

  constructor(
    private itemsParser: ItemsParserService,
    private constraintsParser: ConstraintsParserService,
    private bombParser: BombParserService
  ) {}

  ngOnInit(): void {
    this.filledSlot &&
      this.filledSlot.placeDie({
        color: "yellow" as DieColor,
        number: 5
      });

    // this.itemsParser.demo();
    // this.constraintsParser.demo();
    // this.bombParser.demo();
  }
}
