import { TestBed } from '@angular/core/testing';

import { ItemsParserService } from './items-parser.service';

describe('ItemsParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemsParserService = TestBed.get(ItemsParserService);
    expect(service).toBeTruthy();
  });
});
