import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';
import { Http,Jsonp, Headers} from '@angular/http';  
import { ModalController } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-doctorlist',
  templateUrl: 'doctorlist.html',
})
export class DoctorlistPage {

  constructor(public viewCtrl: ViewController,public modalCtrl:ModalController,public http:Http ,public jsonp:Jsonp,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorlistPage');
  }
  headers = new Headers( {'Content-Type':'application/x-www-form-urlencoded'} );
arr=[];
officeName;
  ngOnInit(){
    let hospitalID =this.navParams.get('doctorID');
    console.log(hospitalID);
    
    this.http.post('http://192.168.230.144:8080/doctorList',JSON.stringify({doctorID:hospitalID}),{headers:this.headers}).subscribe(
      data=>{
        console.log(JSON.parse(data['_body']));
        this.arr=JSON.parse(data['_body']);
        this.officeName=this.arr[0].officeName;
       
      }
    )
  }  
  back(){
    this.viewCtrl.dismiss();
  }
}
