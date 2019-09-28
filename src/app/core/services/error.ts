import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from './events';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private events: EventService
  ) { }

  handleError(err: any): void {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.events.error401.next(true);
        return void 0;
      }
      if (err.status === -1) {
        // We can ignore errors for when the user doesn't have internet connectivity.
        // Usually caused by a computer waking up from sleep and making a request before
        // network connected.
        return void 0;
      }

      let ref;
      const data = {
        url: err.url,
        status: err.status,
        statusText: err.statusText,
        data: (ref = err.message) != null ? ref.toString().substr(0, 2000) : void 0
      };
      if (err.status === 403) {
        this.events.sdError.next({
          message: 'You don\'t have permission to perform this action.',
          header: 'Access Denied.'
        });
      } else {
        let msg: string, header: string;
        if (err.status === 0) {
          msg = 'Looks like you are experiencing low or no internet connectivity - please check your connection';
          header = 'Connectivity issue';
        } else {
          msg = err.url + ' has failed with error ' + err.status + ' ' + err.statusText;
          header = 'An error has occurred.';
        }
        this.events.sdError.next({
          message: msg,
          header: header,
          error: err
        });
      }

      if ('error' in console) {
        console.error(err.url + ' has failed with error ' + err.status + ' ' + err.statusText);
      }
    } else {
      if ('error' in console) {
        console.error(err);
      }
    }
  }
}
