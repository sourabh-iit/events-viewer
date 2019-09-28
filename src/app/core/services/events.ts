import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class EventService {

  public error401: EventEmitter<boolean> = new EventEmitter();
  public sdError: EventEmitter<any> = new EventEmitter();

  constructor() {

  }
}
