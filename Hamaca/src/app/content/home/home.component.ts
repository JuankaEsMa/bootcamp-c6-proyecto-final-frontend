import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCalendar, faUser, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faEarthEurope, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { Chollo } from '../../models/chollo.model';
import { CholloService } from '../../services/chollo.service';
import { Tematica } from '../../models/tematica.model';
import { TematicaService } from '../../services/tematica.service';
import { Localidad } from '../../models/localidad.model';
import { Pais } from '../../models/pais.model';
import { LocalidadService } from '../../services/localidad.service';
import { PaisService } from '../../services/pais.service';
import { Filters } from '../../models/filters.model';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { SharedService } from '../../services/shared.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,MatInputModule,MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  images = [
    'assets/madrid.jpg',
    'assets/paris.jpg',
    'assets/berlin.jpg',
    'assets/roma.jpg',
    'assets/lisboa.jpg',
    'assets/barcelona.jpg',
    'assets/crucero.jpg',
    'assets/senderismo.jpg',
    'assets/louvre.jpg',
    'assets/spa.jpg'
   ];

  currentIndex = 0;

  constructor(private cholloService: CholloService, private tematicaService: TematicaService,
    private localidadService:LocalidadService, private paisService:PaisService, private router: Router,
    private userService:UsuarioService, private sharedService: SharedService){}

    range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    usuario: User|undefined = undefined;
    noClickFav = regularHeart;
    clickedFav = solidHeart;

    page = 0;
    size = 10;
    totalPages = 0;
    isLogged:boolean = false;
    selectedPais:any = "";
    daysBetween:number = 1;
    cantidadPersonas:any;
    chollos:Array<Chollo> = [];
    chollosFavoritos:Array<Chollo> = []
    favClicked: Map<number,IconDefinition> = new Map<number, IconDefinition>;
    tematicas: Array<Tematica> = [];
    localidades: Array<Localidad> = [];
    paises: Array<Pais> = [];
    filters: Filters = {
      dataInicio:"",
      dataFinal:"",
      localidad:"",
      pais:this.selectedPais,
      page:this.page,
      size:this.size,
      precioMax:"",
      precioMin:"",
      tematica:""
  };

  ngOnInit(): void {
    this.userService.getMyCliente().pipe(finalize(()=>this.getChollos()))
    .subscribe({
      next:(result)=>{
        this.chollosFavoritos = result.chollosFavoritos;
        this.isLogged = true;
      },
      error:(error)=>{
        for (let i = 0; i < this.chollos.length; i++) {
          const element = this.chollos[i];
          if(element.id != undefined){
            this.favClicked.set(element.id, this.noClickFav);
          }
        }
        this.isLogged = false;
      }
  })
    this.tematicaService.getAllTematicas().subscribe(tematicas => {
      this.tematicas = tematicas;
    })
    this.localidadService.getAllLocalidades().subscribe(localidades => {
      this.localidades = localidades;
    })
    this.paisService.getAllPaises().subscribe(paises => {
      this.paises = paises;
    })
  }

  favClick(id:any){
    if(this.isLogged){
      if(this.favClicked.get(id) == this.noClickFav){
        this.userService.saveCholloFavorite(id).subscribe({
          next: (result) => {
            console.log(result)
            this.favClicked.set(id,this.clickedFav);
          },
          error: (error) => {
            console.log(error);
            if (error.status === 403) {
              this.router.navigate(['login']);
            }else if(error.status === 200){
              this.favClicked.set(id,this.clickedFav);
            }else if(error.status === 409){
              //No debería de ocurrir nunca
            }
          }
        });
      }else{
        this.userService.removeCholloFavorite(id).subscribe({
          next:(result) =>{
            console.log(result);
          },
          error:(error)=>{
            console.log(error);
          }
        });
        this.favClicked.set(id,this.noClickFav);
      }
    }else{
      this.router.navigate(['login']);
    }
  }

  filterClick(){
    let precioMin:any = document.getElementById("precioMin");
    let precioMax:any = document.getElementById("precioMax");

    if(Number(precioMin.value) > Number(precioMax.value)){
      console.log(precioMin.value);
      console.log(precioMax.value);
      precioMin = ""
      precioMax = ""
    }else{
      precioMin = precioMin.value;
      precioMax = precioMax.value;
    }

    let tematicas: any= document.getElementsByClassName("tematicaInput");
    let localidades: any = document.getElementsByClassName("localidadInput");
    let paises: any = document.getElementsByClassName("paisInput");
    let localidad:string = "";
    let tematica:string = "";
    let pais:string = "";
    for (let i = 0; i < localidades.length; i++) {
      if(localidades[i].checked){
        localidad = localidades[i].value;
      }
    }
    for (let i = 0; i < tematicas.length; i++) {
      if(tematicas[i].checked){
        tematica = tematicas[i].value;
      }
    }
    for (let i = 0; i < paises.length; i++) {
      if(paises[i].checked){
        pais = paises[i].value;
      }
    }
    this.filters.localidad = localidad;
    this.filters.pais = pais;
    this.filters.tematica = tematica;
    this.filters.precioMin = precioMin;
    this.filters.precioMax = precioMax;

    this.getChollos(this.filters);
  }
  clickChollo(id:any){
    this.router.navigate(["chollo/"+id],{queryParams: {daysBetween:this.daysBetween, personas:this.cantidadPersonas}});
  }

  changePais(value:any){
    this.selectedPais = value;
  }

  clickSearch(){
    let start = this.range.controls.start.value;
    let end = this.range.controls.end.value;
    let inputPersonas:any = document.getElementById("inputPersonas");
    if(inputPersonas != null){
      this.cantidadPersonas = inputPersonas.value;
    }
    if(end != null && start != null){
      this.daysBetween = end.getDate() - start.getDate()
      console.log(this.daysBetween)
    }
    this.filters.pais = this.selectedPais;

    this.getChollos(this.filters)
  }

  calculatePrecio(precio:number|undefined):number{
    if(precio != undefined){
      return this.daysBetween * precio;
    }
    return 0;
  }

  getFavIcon(id:number):IconDefinition{
    let icon = this.favClicked.get(id);
    if(icon != undefined){
      return icon;
    }else{
      return this.noClickFav;
    }
  }

  getChollos(filter?:Filters){
    this.cholloService.getChollos(filter).subscribe(body => {
      console.log(body);
      this.totalPages = body.totalPages;
      this.chollos = body.Chollos;
      for (let i = 0; i < this.chollos.length; i++) {
        const element = this.chollos[i];
        let isFavorite = false;
        if(element.id != undefined){
        for (let i = 0; i < this.chollosFavoritos.length; i++) {
          if(this.chollosFavoritos[i].id == element.id){
            isFavorite = true
          }
        }
        if(isFavorite){
          this.favClicked.set(element.id, this.clickedFav);
        }else{
          this.favClicked.set(element.id, this.noClickFav);
        }
        }
      }
    })
  }

  next(){
    this.page++;
    this.filters.page = this.page;
    this.getChollos(this.filters);
  }
  last(){
    this.page--;
    this.filters.page = this.page;
    this.getChollos(this.filters);
  }
  numberClick(numero:number){
    this.page = numero;
    this.filters.page = this.page;
    this.getChollos(this.filters);
  }
}
