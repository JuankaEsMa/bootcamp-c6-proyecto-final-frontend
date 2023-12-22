import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('modal') myModal?: ElementRef;
  user: User | null = null; 
  reservas:Array<Reserva> = [];
  favClicked: Map<number,IconDefinition> = new Map<number, IconDefinition>;
  noClickFav = regularHeart;
  clickedFav = solidHeart;
  daysBetween:number = 1; 
  cantidadPersonas:any;
  reservaId:number = 1;
  chollosFavoritos:Array<Chollo> = []


  constructor(private reservaService:ReservaService, private router:Router){}

  ngOnInit(): void {

    this.getReservas();

  }

  getReservas(){
    this.reservaService.listReservas().subscribe({
      next: (reservas)=>{
        this.reservas = reservas;
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
  setNota(){
    let nota:any = document.getElementById("inputNota");
    console.log(nota.value);
    this.reservaService.setNota(nota.value, this.reservaId).subscribe({
      next:(result)=>{
        console.log(result);
        this.closeModal();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  openModel(reserva:number|undefined){
    (this.myModal?.nativeElement).modal('show');
    if(reserva)
    this.reservaId = reserva;
  }

  closeModal(){
    (this.myModal?.nativeElement).modal('hide');
  }
}
