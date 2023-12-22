import { Component, OnInit } from '@angular/core';
import { Chollo } from '../../models/chollo.model';
import { Reserva } from '../../models/reserva.model';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { ReservaService } from '../../services/reserva.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCalendar, faUser, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faEarthEurope, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  user: User | null = null; 
  reservas:Array<Reserva> = [];
  favClicked: Map<number,IconDefinition> = new Map<number, IconDefinition>;
  noClickFav = regularHeart;
  clickedFav = solidHeart;
  daysBetween:number = 1; 
  cantidadPersonas:any;
  chollosFavoritos:Array<Chollo> = []


  constructor(private reservaService:ReservaService, private router:Router){}

  ngOnInit(): void {

    console.log('Buscando:');
    this.getReservas();

  }

  getReservas(){
    this.reservaService.listReservas().subscribe({
      next: (reservas)=>{
        this.reservas = reservas;
        // console.log(user);

        for (let i = 0; i < this.reservas.length; i++) {
          const chollo = this.reservas[i].chollo!;
        
          if(chollo.id != undefined){
            for (let i = 0; i < this.reservas.length; i++) {
              const element = this.reservas[i].chollo;
              let isFavorite = false;
              if(element != undefined){
                for (let i = 0; i < this.chollosFavoritos.length; i++) {
                  if(this.chollosFavoritos[i].id == element.id){
                    isFavorite = true
                  }
                }
                if(isFavorite){
                  this.favClicked.set(element.id!, this.clickedFav);
                }else{
                  this.favClicked.set(element.id!, this.noClickFav);
                }
              }
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

  calculatePrecio(precio:number|undefined):number{
    if(precio != undefined){
      return this.daysBetween * precio;
    }
    return 0;
  }

  clickChollo(id:any){
    this.router.navigate(["chollo/"+id],{queryParams: {daysBetween:this.daysBetween, personas:this.cantidadPersonas}});
  }

  precioTotal(id:any){
    // if(id != undefined){
    //   return (this.reservas[id].chollo!.precioPersona!)*(this.reservas[id]!.numNoches!);
    // }else{
      return 0;
    //}
  }
}
