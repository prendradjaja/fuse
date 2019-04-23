import { Injectable } from "@angular/core";

const examples = [
  "eq-color 1 2", //
  "eq-color 2 3",
  "neq-color 1 2",
  "foo", // todo are there actually 0-ary constraints? if no, also change targets? to targets
  "bar 1 2 3"
];

export interface Constraint {
  name: string;
  targets?: number[]; // todo should this be required
}

// todo rename to singular? (items parser parses multiple items, this parses a single constraint at a time)
@Injectable({
  providedIn: "root"
})
export class ConstraintsParserService {
  constructor() {}
  parse(fullString: string): Constraint {
    const parts = fullString.split(" ");
    let [name, ...targetStrings] = parts;
    let targets: number[];
    if (targetStrings.length > 0) {
      // todo validate that these are valid numbers, fail loudly otherwise
      targets = targetStrings.map(x => +x);
    }
    return { name, targets };
  }

  demo() {
    console.log("CONSS PARSER DEMO ===================");
    examples.forEach(e => console.log(JSON.stringify(this.parse(e), null, 2)));
  }
}
