import { TestBed } from '@angular/core/testing';

import { ConstraintsParserService } from './constraints-parser.service';

describe('ConstraintsParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstraintsParserService = TestBed.get(ConstraintsParserService);
    expect(service).toBeTruthy();
  });
});
