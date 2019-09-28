import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsViewerComponent } from './components/viewer/viewer.component';


const routes: Routes = [
  {
    path: 'events',
    component: EventsViewerComponent
  },
  {
    path: '**',
    redirectTo: 'events'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsViewerRoutingModule { }
