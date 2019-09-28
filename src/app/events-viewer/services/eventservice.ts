import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class EventsService {
  private eventIds = [];
  private events = [];
  private eventsPerPage = 20;

  constructor(
    private http: HttpClient
  ){
    this.generateEvents(100);
  }

  private generateData(count: number, eventId: number) {
    let data = [];
    for(let i=0;i<count;i++){
      data.push({
        timestamp: Date.now(),
        value: `data ${i+1} of event ${eventId}`
      })
    }
    return data;
  }

  private generateEvents(count: number) {
    for(let i=0;i<count;i++){
      this.eventIds.push(i+1);
      this.events.push({
        id: i+1,
        data: this.generateData(Math.random()*1000, i+1)
      });
    }
  }

  public getEvents(){
    return of(this.eventIds);
  }

  public getEventData(id: number, page: number) {
    let n = (page-1)*this.eventsPerPage;
    let event = this.events.find(event => event.id==id);
    let results = event.data.slice(n,n+this.eventsPerPage);
    let data = {
      next: results.length < event.data.length,
      results: results
    }
    return of(data);
  }
}