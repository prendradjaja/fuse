import { Injectable } from "@angular/core";

const examples = [
  "eq-color 1 2", //
  "eq-color 2 3",
  "neq-color 1 2",
  "foo",
  "bar 1 2 3"
];

interface Constraint {
  name: string;
  targets?: number[];
}

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
