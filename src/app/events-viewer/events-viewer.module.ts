import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EventsViewerComponent } from './components/viewer/viewer.component';
import { EventsService } from './services/eventservice';
import { EventsViewerRoutingModule } from './events-viewer.routing';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    EventsViewerComponent
  ],
  imports: [
    CommonModule,
    EventsViewerRoutingModule
  ],
  providers: [
    EventsService
  ]
})
export class EventsViewerModule { }
