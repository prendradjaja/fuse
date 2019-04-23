import { Injectable } from "@angular/core";

const examples = [
  "target.five, eq, target.five, eq, target.five",
  "target.five, neq, target.five",
  "foo.bar.baz, fubar"
];

export interface Item {
  name: string;
  attributes?: string[]; // todo should this be required
}

@Injectable({
  providedIn: "root"
})
export class ItemsParserService {
  constructor() {}

  parse(fullString: string): Item[] {
    const itemStrings = fullString.split(", ");
    return itemStrings.map(itemString => {
      const parts = itemString.split(".");
      if (!parts.every(part => this.isValidIdentifier(part))) {
        throw new Error("Malformed items definition: " + fullString);
      }
      let [name, ...attributes] = parts;
      if (attributes.length === 0) {
        attributes = undefined;
      }
      return { name, attributes };
    });
  }

  isValidIdentifier(s: string) {
    return !!s.match(/^[a-z]+$/);
  }

  demo() {
    console.log("ITEMS PARSER DEMO ===================");
    examples.forEach(e => console.log(JSON.stringify(this.parse(e), null, 2)));
  }
}
