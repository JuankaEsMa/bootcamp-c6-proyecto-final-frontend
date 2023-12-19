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
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,MatInputModule,MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private cholloService: CholloService, private tematicaService: TematicaService, 
    private localidadService:LocalidadService, private paisService:PaisService, private router: Router){}

  fav = regularHeart;
  calendar = faCalendar;
  earth = faEarthEurope;
  persona = faUser;
  chollos:Array<Chollo> = [];
  tematicas: Array<Tematica> = [];
  localidades: Array<Localidad> = [];
  paises: Array<Pais> = [];

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

    let filters: Filters = {
      localidad: localidad,
      pais: pais,
      tematica: tematica,
      precioMin: precioMin,
      precioMax: precioMax,
      dataInicio: '',
      dataFinal: '',
      page: 0,
      size: 5
    }

    this.cholloService.getAllChollosFiltered(filters).subscribe(body => {
      this.chollos = body.Chollos;
      console.log(body);
    });
  }
  clickChollo(id:any){
    this.router.navigate(["chollo/"+id]);
  }
}