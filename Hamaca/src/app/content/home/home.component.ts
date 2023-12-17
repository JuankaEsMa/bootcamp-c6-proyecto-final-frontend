import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faUser, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faEarthEurope, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; 
import { Chollo } from '../../models/chollo.model';
import { CholloService } from '../../services/chollo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private cholloService: CholloService){}

  fav = regularHeart;
  calendar = faCalendar;
  earth = faEarthEurope;
  persona = faUser;
  chollos:Array<Chollo> = [];

  ngOnInit(): void {
    this.cholloService.getAllChollos().subscribe(body => {
      this.chollos = body.Chollos;
      console.log(this.chollos);
    })
  }

  favClick(id:any){
    if(this.fav == solidHeart){
      this.fav = regularHeart;
    }else{
      this.fav = solidHeart;
    }
  }
}

