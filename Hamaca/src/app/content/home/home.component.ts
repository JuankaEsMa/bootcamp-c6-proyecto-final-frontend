import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faUser, faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
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
    private dateAdapter: DateAdapter<Date>){
      this.dateAdapter.setLocale('es-ES')
    }

    range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });

    fav = regularHeart;
    calendar = faCalendar;
    earth = faEarthEurope;
    persona = faUser;
    selectedPais:any = "";
    daysBetween:number = 1; 
    cantidadPersonas:any;
    chollos:Array<Chollo> = [];
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
      console.log(this.chollos);
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
    if(this.fav == solidHeart){
      this.fav = regularHeart;
    }else{
      this.fav = solidHeart;
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
    });
  }

  calculatePrecio(precio:number|undefined):number{
    if(precio != undefined){
      return this.daysBetween * precio;
    }
    return 0;
  }
}