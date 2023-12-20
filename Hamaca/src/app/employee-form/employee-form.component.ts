import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Chollo } from '../models/chollo.model';
import { Tematica } from '../models/tematica.model';
import { CholloService } from '../services/chollo.service';
import { TematicaService } from '../services/tematica.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit{

  chollo:Chollo = new Chollo();
  tematicas: Array<Tematica> = [];
  tematicasChollo: Array<Tematica> = [];

  cholloForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    imagen: new FormControl('',  Validators.required),
    descripcion: new FormControl('', Validators.required),
    precioPersona: new FormControl('', Validators.required),
    cantidadPersonas: new FormControl('', Validators.required),
    fechaCaducidad: new FormControl('', Validators.required),
    localidad: new FormControl('', Validators.required)
  })

  constructor(private cholloService:CholloService, private tematicaService:TematicaService, 
    private elementRef: ElementRef, private router:Router, private sharedService:SharedService){}

  ngOnInit(): void {
    this.tematicaService.getAllTematicas().subscribe(tematicas => {
      this.tematicas = tematicas;
    })
  }

  ngAfterViewInit() {
    var forms = this.elementRef.nativeElement.querySelectorAll('.needs-validation');
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event: any) {
            if (!form.checkValidity()) {
              event.preventDefault(),
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
  }

  add(){

    // this.chollo.id = parseInt(this.cholloForm.value.id!);
    // this.chollo.titulo = this.cholloForm.value.titulo?.toString();
    // this.chollo.imagen = this.cholloForm.value.imagen?.toString();
    // this.chollo.descripcion = this.cholloForm.value.descripcion?.toString();
    // this.chollo.precioPersona = parseFloat(this.cholloForm.value.precioPersona!);
    // this.chollo.cantidadPersonas = parseInt(this.cholloForm.value.cantidadPersonas!);
    // this.chollo.fechaCaducidad = new Date(this.cholloForm.value.fechaCaducidad!);
    // this.chollo.localidad = this.cholloForm.value.localidad?.toString();

    // this.cholloService.addChollo(this.chollo).subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // );

    // let tematicasAdd: any= document.getElementsByClassName("tematicaInput");
    // let tematica:string = '';

    // for (let i = 0; i < tematicasAdd.length; i++) {
    //   if(tematicasAdd[i].checked){
    //     tematica = tematicasAdd[i].value;

    //     this.cholloService.addTematicaInChollo(this.cholloForm.value.id!, tematica).subscribe(
    //       response => {
    //         console.log(response);
    //       }
    //     );
    //   }
    // }
  }
}