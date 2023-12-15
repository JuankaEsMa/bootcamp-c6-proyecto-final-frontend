import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faUser, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faEarthEurope, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  fav = regularHeart;
  calendar = faCalendar;
  earth = faEarthEurope;
  persona = faUser;

  favClick(){
    if(this.fav == solidHeart){
      this.fav = regularHeart;
    }else{
      this.fav = solidHeart;
    }
  }
}

