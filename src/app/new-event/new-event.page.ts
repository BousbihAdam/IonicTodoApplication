import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../EventModel';
import { EventsService } from '../services/events.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {
  event : EventModel = new EventModel();

  constructor(private eventsService : EventsService,
  private router: Router) { }

  ngOnInit() {
  }


  newEventForm() {
    console.log("premier");
    console.log(this.event);
    if(this.event.title.length > 4){
      
   // this.event.location  = this.location;
    this.event.id= Date.now();
    console.log("apres modif");
    console.log(this.event);
    
    this.eventsService.newEvent(this.event);
    this.eventsService.scheduleNotification();
    //fermeture auto de la page après l'ajout
 
    
    this.router.navigate(['/home']);
   
  }
  }


}
