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
import { DateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/user.service';
import { error } from 'console';
import { User } from '../../models/user.model';
import { subscribe } from 'diagnostics_channel';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,MatInputModule,MatSelectModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  constructor(private cholloService: CholloService, private tematicaService: TematicaService, 
    private localidadService:LocalidadService, private paisService:PaisService, private router: Router,
    private userService:UsuarioService){}

    range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    usuario: User|undefined = undefined;
    noClickFav = regularHeart;
    clickedFav = solidHeart;

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
      page:0,
      size:10,
      precioMax:"",
      precioMin:"",
      tematica:""
  };

  ngOnInit(): void {
    this.cholloService.getAllChollos().subscribe(body => {
      this.chollos = body.Chollos;
      this.userService.getMyCliente().subscribe({
          next:(result)=>{
            this.chollosFavoritos = result.chollosFavoritos;
            console.log(this.chollosFavoritos);
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
            }else{
              console.log(error.status);
            }
          }
        });
      }else{
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

    this.filterChollo();
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
    
    this.filterChollo()
  }

  filterChollo(){
    this.cholloService.getAllChollosFiltered(this.filters).subscribe(body => {
      this.chollos = body.Chollos;
      for (let i = 0; i < this.chollos.length; i++) {
        let id = this.chollos[i].id;
        if(id != undefined){
          this.favClicked.set(id,this.noClickFav)
        }
      }
    });
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
}