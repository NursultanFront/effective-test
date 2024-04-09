/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStorageTasksService } from './local-storage-tasks.service';

describe('Service: LocalStorageTasks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageTasksService]
    });
  });

  it('should ...', inject([LocalStorageTasksService], (service: LocalStorageTasksService) => {
    expect(service).toBeTruthy();
  }));
});
