import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CholloService } from '../../services/chollo.service';
import { Injectable } from '@angular/core';
import { Chollo } from '../../models/chollo.model'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-chollo-detail',
  standalone: true,
  imports: [MatInputModule,MatDatepickerModule,MatNativeDateModule,ReactiveFormsModule],
  templateUrl: './chollo-detail.component.html',
  styleUrl: './chollo-detail.component.css'
})
export class CholloDetailComponent implements OnInit{
  @ViewChild('modal') myModal?: ElementRef;
  range = new FormGroup({
    start: new FormControl<Date | null>(null,Validators.required),
    end: new FormControl<Date | null>(null,Validators.required),
  });
  formModel = new FormGroup({
    numNoches: new FormControl(1, Validators.required),
    numPersonas: new FormControl(1, Validators.required)
  })
  id:string='';
  chollo:Chollo = new Chollo();
  daysBetween: number = 1;
  personas: number = 1;

  constructor(private route:ActivatedRoute, private service:CholloService, private reservaService: ReservaService,
    private tokenService: TokenStorageService, private router: Router){}

  ngOnInit(): void {
    this.route.params.subscribe(param => 
      this.id = param['id']);
      this.getChollo();
      this.route.queryParams.subscribe(params=>{
        if(params['daysBetween']){
          this.daysBetween = params['daysBetween']
        }
        if(params['personas']){
          this.personas = params['personas'];
        }
        this.formModel.controls.numNoches.setValue(this.daysBetween)
        this.formModel.controls.numPersonas.setValue(this.personas)
      })
  }

  getChollo(){
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
    if(this.formModel.valid && this.formModel.valid){
      let numPersonas = this.formModel.controls.numPersonas.value;
      let start = this.range.controls.start.value;
      let end = this.range.controls.end.value;
      if(start && end){
        let fechaInicio = start?.getFullYear()+"-"+(start?.getMonth()+1) + "-" +start?.getDate();
        let fechaFin = end?.getFullYear()+"-"+ (end?.getMonth()+1) + "-" +end?.getDate()
        if(this.chollo.id)
        this.reservaService.addReserva(this.chollo.id, fechaInicio, fechaFin, numPersonas+"").subscribe({
          next: (result)=>{
            console.log(result)
          },
          error: (error)=>{
            console.log(error)
          }
        })
      }
    }
  }
}
