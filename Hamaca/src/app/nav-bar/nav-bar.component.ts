import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  token:string|null;

  constructor(public tokenService: TokenStorageService){
    console.log(tokenService.getUser());
    this.token = this.tokenService.getToken();
  }

  logout(){
    console.log("entro")
    this.tokenService.signOut();
    this.token = null;
  }
}
