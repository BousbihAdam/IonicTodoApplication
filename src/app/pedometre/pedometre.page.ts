import { Component,NgZone } from '@angular/core';
import {  NavController, NavParams,ToastController, Platform } from '@ionic/angular';
import { Pedometer } from '@ionic-native/pedometer/ngx';

/**
 * Generated class for the PedometrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pedometre',
  templateUrl: './pedometre.page.html',
})
export class PedometrePage {
  start: boolean;
  PedometerData:any;
  stepCount : any = 0;
  startTime: Date;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public pedoCtrl: Pedometer,
    public toastCtrl: ToastController,
    private ngZoneCtrl: NgZone) {
    this.stepCount = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedometrePage');
  }
  fnGetPedoUpdate(){
 
	  	this.pedoCtrl.startPedometerUpdates()
		   .subscribe((PedometerData) => {
		   		this.PedometerData = PedometerData;
		   		this.ngZoneCtrl.run(() => {
			        this.stepCount = this.PedometerData.numberOfSteps;
			   	    this.startTime = new Date(this.PedometerData.startDate);
				   	// this.endDate = new Date(this.PedometerData.endDate);
		      	});
	   });
     this.start = true;
     this.fnTost('Podometre en marche...');
	 
  }

  fnStopPedoUpdate(){
  	this.pedoCtrl.stopPedometerUpdates();
	  this.start = false;
  }
 

  fnTost(message) {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 3000
    });
  
}


}
