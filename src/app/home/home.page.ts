import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Platform, AlertController } from '@ionic/angular';
import { EventsService } from '../services/events.service';
import { EventModel } from '../../EventModel';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  events: EventModel[];
  constructor(private router: Router,
    public platformCtrl: Platform,
    private eventsService : EventsService,
    private localNotif: LocalNotifications ,
    public alertController: AlertController
  ) {
    this.platformCtrl.ready().then(() =>{
      this.localNotif.on('click').subscribe(notif => {
        this.presentAlertConfirm();
      });
      this.eventsService.getEvents()
      .then(
        (events) => {
          this.events = events;
        //  this.events = orderPipe.transform(this.events, 'id');
        });
        this.eventsService.scheduleNotification();
    });
   }
   async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Oui',
          handler: () => {
            this.router.navigate(["/pedometre"]);
          }
        }
      ]
    });

    await alert.present();
  }

  newEvent(){
    this.router.navigate(['/new-event']);
  }

  onClkEvent(event : EventModel){
    this.router.navigate(["/view-event", event]);
      
    //  this.modalCtrl.create(EventPage,event).present();
   
    
  }
  ionViewWillEnter(){
    this.eventsService.getEvents()
       .then(
         (events) => 
           this.events = events);
    //  this.events = this.orderPipe.transform(this.events, 'id');
    // qd la page s'ouvre meme avc donnees cache
 

  }
  onDelete(event : EventModel){

    this.eventsService.deleteEvent(event);
    let index = this.events.indexOf(event);
    if(index > -1){
      this.events.splice(index,1);
    }
  }
  
}
