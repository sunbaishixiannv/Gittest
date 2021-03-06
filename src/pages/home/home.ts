import { Component,ViewChild } from '@angular/core';
import { NavController,IonicPage, NavParams,Slides, AlertController } from 'ionic-angular';
import { Http,Jsonp, Headers} from '@angular/http';  
import { ModalController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  constructor(public modalCtrl:ModalController,public http:Http ,public jsonp:Jsonp,public navCtrl: NavController,public alertCtrl: AlertController){  }
  
  headers = new Headers( {'Content-Type':'application/x-www-form-urlencoded'} );
  
  ngAfterViewInit() {
    this.slides.freeMode = true;
    this.slides.loop=true;
    this.slides.autoplay=1000;
  }
  arr=[];
  arr1=[];
  ngOnInit(){
    this.http.post('http://192.168.230.144:8080/office',JSON.stringify({officeID:1}), {headers:this.headers}).subscribe(
      data=>{
        this.arr1=JSON.parse(data['_body']);
        this.arr1.length=7;

      }
    );
    this.http.post('http://192.168.230.144:8080/doctorList',JSON.stringify({doctorID:1}),{headers:this.headers}).subscribe(
      data=>{
        this.arr=JSON.parse(data['_body']);
        console.log(this.arr);
      }
    )
  }
  goOffice (idx){
    let profileModal = this.modalCtrl.create('HospitalPage',{officeID:this.arr1[idx].officeID});
    profileModal.present();
  }
  goToList(){
    let profileModal = this.modalCtrl.create('HospitalListPage',{officeID:1});
    profileModal.present();
  }
  goall(){
    let profileModal = this.modalCtrl.create('AllHospitalPage');
    profileModal.present();
  }
  goDoc(idx){
    let profileModal = this.modalCtrl.create('DoctorPage',{doctorID:this.arr[idx].DoctorID});
    profileModal.present();  
  }
}
