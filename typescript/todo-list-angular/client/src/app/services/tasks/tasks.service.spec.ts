import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';

describe('RegisterService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
