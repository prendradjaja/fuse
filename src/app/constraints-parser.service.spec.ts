import { TestBed } from "@angular/core/testing";

import { ConstraintsParserService } from "./constraints-parser.service";

describe("ConstraintsParserService", () => {
  let service: ConstraintsParserService;

  const examples = {
    unary: "foo 1",
    binary: "bar 2 4",
    ternary: "baz 1 2 3",

    unaryParsed: {
      name: "foo",
      targets: [1]
    },
    binaryParsed: {
      name: "bar",
      targets: [2, 4]
    },
    ternaryParsed: {
      name: "baz",
      targets: [1, 2, 3]
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(ConstraintsParserService);
  });

  it("should handle unary constraints", () => {
    expect(service.parse(examples.unary)).toEqual(examples.unaryParsed);
  });

  it("should handle binary constraints", () => {
    expect(service.parse(examples.binary)).toEqual(examples.binaryParsed);
  });

  it("should handle ternary constraints", () => {
    expect(service.parse(examples.ternary)).toEqual(examples.ternaryParsed);
  });
});
