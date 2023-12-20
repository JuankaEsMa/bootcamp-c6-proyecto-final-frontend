import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CholloService } from '../../services/chollo.service';
import { Injectable } from '@angular/core';
import { Chollo } from '../../models/chollo.model'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-chollo-detail',
  standalone: true,
  imports: [],
  templateUrl: './chollo-detail.component.html',
  styleUrl: './chollo-detail.component.css'
})
export class CholloDetailComponent implements OnInit{

  id:string='';
  chollo:Chollo = new Chollo();
  localidad:any = null;
  tematicas:Array<any> = [];
  daysBetween: number = 1;
  personas: number = 1;

  constructor(private route:ActivatedRoute, private service:CholloService){}

  ngOnInit(): void {
    this.route.params.subscribe(param => 
      this.id = param['id']);
      console.log('Engaged');
      this.getChollo();
      this.route.queryParams.subscribe(params=>{
        console.log(params);
        this.daysBetween = params['daysBetween'];
        this.personas = params['personas'];
      })
  }

  getChollo(){
    console.log("Calling..."+this.id);
    this.service.getCholloById(this.id)
    .subscribe(result => {
      this.chollo = result;
      console.log(this.chollo);
      this.localidad = this.chollo.localidad;
      this.tematicas = this.chollo.tematicas;
    })
  }

  calculatePrecio(precio:number|undefined):number{
    if(precio != undefined){
      return this.daysBetween * precio;
    }
    return 0;
  }

  reservar(id:number|undefined){
    
  }
}
