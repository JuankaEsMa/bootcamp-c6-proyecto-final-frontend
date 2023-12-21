import { Component, OnInit } from '@angular/core';
import { Chollo } from '../../models/chollo.model';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { UsuarioService } from '../../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCalendar, faUser, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faEarthEurope, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit{

  user: User | null = null; 
  chollosFavoritos:Array<Chollo> = [];
  favClicked: Map<number,IconDefinition> = new Map<number, IconDefinition>;
  noClickFav = regularHeart;
  clickedFav = solidHeart;
  daysBetween:number = 1; 
  cantidadPersonas:any;

  constructor(private userService:UsuarioService, private router:Router){}

  ngOnInit(): void {

    console.log('Buscando:');

    this.userService.getMyCliente().subscribe({
      next: (user)=>{
        this.user = user;
        this.chollosFavoritos = user.chollosFavoritos;
        // console.log(user);

        for (let i = 0; i < this.chollosFavoritos.length; i++) {
          const chollo = this.chollosFavoritos[i];
        
          if(chollo.id != undefined){
            if(this.chollosFavoritos[i].id == chollo.id){
              this.favClicked.set(chollo.id, this.clickedFav);
            }
          }
        }

      },
      error:(error)=>{
        console.log('Ha sucedido un error!');
      }
    })

  }

  getFavIcon(id:number):IconDefinition{
    let icon = this.favClicked.get(id);
    if(icon != undefined){
      return icon;
    }else{
      return this.noClickFav;
    }
  }

  eraseFav(id:any){
      if(this.favClicked.get(id) != null){
        this.userService.removeCholloFavorite(id).subscribe({
          next: (result) => {
            console.log(result);
            this.ngOnInit();
          },
          error: (error) => {
            console.log(error);
            if (error.status === 403) {
              this.router.navigate(['login']);
            }else if(error.status === 200){
              this.favClicked.set(id,this.clickedFav);
            }else{
              console.log(error.status);
            }
          }
        });
      }
  }

  calculatePrecio(precio:number|undefined):number{
    if(precio != undefined){
      return this.daysBetween * precio;
    }
    return 0;
  }

  clickChollo(id:any){
    this.router.navigate(["chollo/"+id],{queryParams: {daysBetween:this.daysBetween, personas:this.cantidadPersonas}});
  }
}
