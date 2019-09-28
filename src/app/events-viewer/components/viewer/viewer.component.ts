import { Component, OnInit, OnDestroy } from "@angular/core";
import { EventsService } from '../../services/eventservice';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-events-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class EventsViewerComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public eventDataCacheById = {};
  public tabs = [];
  public events: Array<any>;
  public eventIds = [];
  public selectedEvent: any;

  constructor(
    private eventsService: EventsService
  ){
  }

  ngOnInit(){
    this.loadEventIds();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private loadEventIds(){
    this.subscriptions.add(this.eventsService.getEvents().subscribe((events)=>{
      this.eventIds = events;
    }));
  }

  public selectEvent(eventId){
    if(eventId in this.eventDataCacheById) {
      this.selectedEvent = this.eventDataCacheById[eventId];
    } else {
      this.loadEvent(eventId);
    }
  }

  public getOpenEventIds(){
    return Object.keys(this.eventDataCacheById);
  }

  public loadEvent(eventId: number) {
    let event = {
      results: [],
      page: 0,
      next: false,
      id: eventId
    }
    if(eventId in this.eventDataCacheById) {
      event = this.eventDataCacheById[eventId];
    }
    this.subscriptions.add(this.eventsService.getEventData(eventId, event.page+1).subscribe((data: any)=>{
      event.results = event.results.concat(data.results);
      event.page += 1;
      event.next = data.next;
      this.selectedEvent = event;
      this.eventDataCacheById[eventId] = event;
    }));
  }

  public closeEvent(eventId) {
    delete this.eventDataCacheById[eventId];
    let keys = Object.keys(this.eventDataCacheById);
    if(keys.length>0){
      this.selectedEvent = this.eventDataCacheById[keys[keys.length-1]];
    } else {
      this.selectedEvent = null;
    }
  }

}