export class EventModel{
    id: any;
    title: string;
    description: string;
    jour: string;
    heure: string;
    type: string;
    image: any;
    notif: boolean = false;
    location: {
        lat: number,
        lng: number
    };
}
  