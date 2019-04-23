import { Injectable } from "@angular/core";
import { Item, ItemsParserService } from "./items-parser.service";
import {
  Constraint,
  ConstraintsParserService
} from "./constraints-parser.service";

// todo i hate using JSON in names, but what's a better concise way of saying "this is something in my bomb card description language"
interface BombCardJSON {
  items: string;
  constraints: string[];
}

// todo rename five to rainbow
const examples = [
  {
    items: "target.five, eq, target.five, eq, target.five",
    constraints: [
      "eq-color 1 2", //
      "eq-color 2 3"
    ]
  },
  {
    items: "target.five, neq, target.five",
    constraints: [
      "neq-color 1 2" //
    ]
  }
];

// hyphens are reserved for syntax sugar
// identifiers can only have a-z

// todo maybe target should be named slot
// and slot should be named slotpic
// and ghost should be named ghostslot or slotghost?
// SLOTS ETC
// slot
// target
// ghost
// slot.question
// - used in the card containing "stack(slot.question, slot.question, ...)"

// MATH
// lt
// gt
// eq
// neq
// plus

// OTHER UI ELTS
// number(1)
// br

// COMBINING THINGS
// target.numsign.small
// target.num(2).small
// target.small.num(2)
// target.green.num(2)

// COLORS
// target.color(red)
// - maybe syntax sugar: target.red
// target.color(red, green)
// - maybe syntax sugar: target.red-green
// target.color(null, green)
// target.color(red, null)
// really only useful when combined with twocolor

// NUMBERS
// target.num(2)
// - maybe syntax sugar: target.num-2
// target.num(1, 4)
// - maybe syntax sugar: target.num-1-4
// target.numsign
// target.num(null, 4)
// target.num(4, null)
// - really only useful when combined with twocolor
// target.rainbow

// SIZES
// .xlarge .large .normal .small .xsmall
// - do i need all of these?

// THE WEIRDEST SLOTS
// target.numrainbow
// - this one is used for this card
//   "target.numrainbow eq target.numrainbow eq target.numrainbow" (difficulty 2)
//   i think this means that all three targets must be same color OR must be same number
// - it is also used for this card
//   "target.numsign eq target.numrainbow eq target.rainbow" (difficulty 1)
//   i think this means that btwn targets 1 and 2, number must match
//   and btwn targets 2 and 3, color must match
// target.numrainbowboth
// - this is used for this card
//   "target.numrainbowboth eq target.numrainbowboth" (difficulty 4)

// STACKS
// stack(slot.red, slot.green, slot.blue)
// stack(slot.numsign, gt, slot.numsign, gt, slot.numsign)
// - how should sizes interact with stacks?
//   option 1) stacks make every size mean something smaller
//   option 2) stacks make everything .small by default
//   option 3) stacks don't impact size, and you have to add .small manually
// stack.toparrow(slot.red, slot.green, slot.blue)

// PYRAMIDS
// pyramid(slot.yellow, slot.blue, slot.green)
// - three-item pyramid = two-row pyramid

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
