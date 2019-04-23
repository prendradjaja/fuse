import { TestBed } from "@angular/core/testing";

import { BombParserService } from "./bomb-parser.service";

describe("BombParserService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: BombParserService = TestBed.get(BombParserService);
    expect(service).toBeTruthy();
  });
});
