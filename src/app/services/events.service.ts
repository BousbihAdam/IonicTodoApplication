import { EventModel } from "../../EventModel";
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core"; 
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
@Injectable()
export class EventsService{

    private events:EventModel[] = [] ; 


    constructor(private storage : Storage,
    private localNotif: LocalNotifications){}


    newEvent(e: EventModel){
        this.events.push(e);
        this.storage.set('events',this.events);
    }

    deleteEvent(e: EventModel){
        let index = this.events.indexOf(e);
        if(index > -1){
            this.events.splice(index, 1);
            this.storage.set('events',this.events);
        }
  
    }
    getEvents(){
        // get retourne une promesse , donc on utilise 'then' pour pouvoir
        // agir une fois que les données ont été récupérer 
        return this.storage.get('events')
            .then(
                (events) => {
                    // 1ere utilisation : pas d'events = events sera undifined 
                    // si events undifined , on reoturne tab vide
                    this.events = events != null ? events : [] ;
                    // slice = "une copie"
                    return this.events.slice().reverse();
                }
            );
    }


    scheduleNotification(){
        this.events.forEach(e => {
          let x = e.jour + " "+ e.heure + " GMT+0100";
          console.log("  this.localNotif.getscheduledis");
          
          // Check
         // this.localNotif.isScheduled(e.id).then((isScheduled) => {
          if(e.notif){
            this.localNotif.schedule({
              id: e.id,
              title: e.title,
              text: e.description,
              icon:"assets/imgs/event.png",
              smallIcon:"assets/imgs/event.png",
              trigger: {at: new Date(new Date(x).getTime())}
            });
         // });
          }
          
          
          
        });
     
      }
  
      

}