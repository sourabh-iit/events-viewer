import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, ErrorHandler } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { EventService } from './services/events';
import { GlobalErrorHandler } from './services/error';

const COMPONENTS = [
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        EventService,
        ToastrService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler }
      ],
    };
  }
}
