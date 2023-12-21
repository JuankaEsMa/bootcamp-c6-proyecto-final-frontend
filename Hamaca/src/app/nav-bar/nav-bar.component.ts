import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UsuarioService } from '../services/user.service';
import { error } from 'console';
import { User } from '../models/user.model';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  user:User|undefined = undefined;

  constructor(private tokenService: TokenStorageService, private userService: UsuarioService, private router:Router){
    userService.getAllUsers().subscribe({
      next: (result)=>{
        this.user = result;
      },
      error: (error) =>{
        this.user = undefined;
      }
    })
  }

  logout(){
    this.tokenService.signOut();
    this.router.navigate([''])
    this.user = undefined;
  }
  getUserInitial(){
    if(this.user != undefined){      
      return this.user.nombre?.charAt(0);
    }else{
      return "H";
    }
  }
}
