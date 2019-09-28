import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { EventService } from './core/services/events';

@Component({
  selector: 'app-root',
  template: `
    <ngx-loading-bar color='#db001b' height='3px'></ngx-loading-bar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: [

  ]
})

export class AppComponent  implements OnInit {
  public router$: Observable<any>;

  constructor(
    private events: EventService,
    private toast: ToastrService
  ) {
    this.events.sdError.subscribe(this.onSdError);
  }

  ngOnInit() {
  }

  private onSdError = (error: {message: string, header?: string, error?: HttpErrorResponse}) => {
    let header = error.header;
    let text = error.message;
    if (error.error != null && error.error.error instanceof Array) {
      try {
        header = error.error.statusText;
        text = error.error.error.join(' ');
      } catch (e) {
        header = error.header;
        text = error.message;
      }
    }
    this.toast.error(text, header);
  }
}
