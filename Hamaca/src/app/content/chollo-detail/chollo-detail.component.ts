import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CholloService } from '../../services/chollo.service';
import { Injectable } from '@angular/core';
import { Chollo } from '../../models/chollo.model'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-chollo-detail',
  standalone: true,
  imports: [MatInputModule,MatDatepickerModule,MatNativeDateModule,],
  templateUrl: './chollo-detail.component.html',
  styleUrl: './chollo-detail.component.css'
})
export class CholloDetailComponent implements OnInit{
  @ViewChild('modal') myModal?: ElementRef;
  
  id:string='';
  chollo:Chollo = new Chollo();
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
    })
  }

  calculatePrecio(precio:number|undefined):number{
    if(precio != undefined){
      return this.daysBetween * precio;
    }
    return 0;
  }

  openModel(){
    (this.myModal?.nativeElement).modal('show');
  }

  closeModal(){
    (this.myModal?.nativeElement).modal('hide');
  }

  reservar(){

  }
}
