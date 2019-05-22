import { TestBed } from '@angular/core/testing';

import { ClientManagementService } from './client-management.service';

describe('ClientManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientManagementService = TestBed.get(ClientManagementService);
    expect(service).toBeTruthy();
  });
});
