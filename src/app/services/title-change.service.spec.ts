import { TestBed } from '@angular/core/testing';

import { TitleChangeService } from './title-change.service';

describe('TitleChangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleChangeService = TestBed.get(TitleChangeService);
    expect(service).toBeTruthy();
  });
});
