import { Injectable } from "@angular/core";
import { Item, ItemsParserService } from "./items-parser.service";
import {
  Constraint,
  ConstraintsParserService
} from "./constraints-parser.service";

// todo i hate using JSON in names, but what's a better concise way of saying "this is something in my bomb card description language"
export interface BombCardJSON {
  items: string;
  constraints: string[];
}

const examples = [
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

// todo all of these are basically AST nodes. probably i will need a smarter layer on top -- should i rename these to have AST in the names?
interface BombCard {
  items: Item[];
  constraints: Constraint[];
}

@Injectable({
  providedIn: "root"
})
export class BombParserService {
  constructor(
    private itemsParser: ItemsParserService,
    private constraintsParser: ConstraintsParserService
  ) {}

  parse(bombJson: BombCardJSON): BombCard {
    return {
      items: this.itemsParser.parse(bombJson.items),
      constraints: bombJson.constraints.map(constraintString =>
        this.constraintsParser.parse(constraintString)
      )
    };
  }

  demo() {
    console.log("BOMBS PARSER DEMO ===================");
    examples.forEach(e => console.log(JSON.stringify(this.parse(e), null, 2)));
  }
}
