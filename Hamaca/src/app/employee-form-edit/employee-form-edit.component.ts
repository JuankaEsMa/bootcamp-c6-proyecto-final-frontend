import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chollo } from '../models/chollo.model';
import { Tematica } from '../models/tematica.model';
import { Localidad } from '../models/localidad.model';
import { CholloService } from '../services/chollo.service';
import { TematicaService } from '../services/tematica.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form-edit.component.html',
  styleUrl: './employee-form-edit.component.css'
})
export class EmployeeFormEditComponent implements OnInit, AfterViewInit{

  id:any = '';
  chollo:Chollo = new Chollo();
  tematicas: Array<Tematica> = [];
  tematicasChollo: Array<Tematica> = [];
  tematica = new Tematica();
  localidad: any = null;

  cholloForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    imagen: new FormControl('',  Validators.required),
    descripcion: new FormControl('', Validators.required),
    precioPersona: new FormControl('', Validators.required),
    cantidadPersonas: new FormControl('', Validators.required),
    fechaCaducidad: new FormControl('', Validators.required),
    localidad: new FormControl('', Validators.required),
    tematica: new FormControl('', Validators.required)
  })

  constructor(private tematicaService:TematicaService, private cholloService:CholloService, private route:ActivatedRoute, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.tematicaService.getAllTematicas().subscribe(tematicas => {
      this.tematicas = tematicas;
    })

    this.route.params.subscribe(param => 
      this.id = param['id']);
    this.set_inputs();
  }

  set_inputs(){
    this.cholloService.getCholloById(this.id).subscribe((data:any) => {
      
      this.chollo = data;
    })
      this.id = this.chollo.id;
      this.localidad = this.chollo.localidad;
      this.tematicasChollo = this.chollo.tematicas;
      // console.log(this.chollo.tematicas);

        this.cholloForm.setValue({
          id: this.chollo.id?.toString()!,
          titulo: this.chollo.titulo ?? "",
          imagen: this.chollo.imagen ?? "",
          descripcion: this.chollo.descripcion?? "",
          precioPersona: this.chollo.precioPersona?.toString() ?? "",
          cantidadPersonas: this.chollo.cantidadPersonas?.toString() ?? "",
          fechaCaducidad: this.chollo.fechaCaducidad?.toString() ?? "",
          localidad: this.localidad.nombre,
          tematica: this.chollo.tematicas?.toString() ?? ""
        });
      
        let tematicasForm: any= document.getElementsByClassName("tematicaInput");

        for (let i = 0; i < this.tematicas.length; i++) {
          for(let j = 0; j < this.tematicasChollo.length; j++){
              if(this.tematicas[i].nombre === this.tematicasChollo[j].nombre){
                tematicasForm[i].checked = true;
              }
          }
        }
  }

  ngAfterViewInit() {
    var forms = this.elementRef.nativeElement.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event: any) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  }

  setCholloValues(){
    this.cholloService.getCholloById(this.id.toString()).subscribe((data:any) => {
      this.chollo = data;
      this.id = this.chollo.id;

      if(data != null){
        this.chollo.id = parseInt(this.cholloForm.value.id!);
        this.chollo.titulo = this.cholloForm.value.titulo?.toString();
        this.chollo.imagen = this.cholloForm.value.imagen?.toString();
        this.chollo.descripcion = this.cholloForm.value.descripcion?.toString();
        this.chollo.precioPersona = parseFloat(this.cholloForm.value.precioPersona!);
        this.chollo.cantidadPersonas = parseInt(this.cholloForm.value.cantidadPersonas!);
        this.chollo.fechaCaducidad = new Date(this.cholloForm.value.fechaCaducidad!);
        this.chollo.localidad = this.cholloForm.value.localidad?.toString();   
      }
    })
  }

  update(){
    this.setCholloValues();

    console.log( this.tematica.id?.toString() ?? "");

    this.cholloService.updateChollo(this.id, this.chollo).subscribe(
      response => {
        console.log(response);
      }
    );

    let tematicasAdd: any= document.getElementsByClassName("tematicaInput");
    let tematica:string = '';

    for (let i = 0; i < tematicasAdd.length; i++) {
      if(tematicasAdd[i].checked){
        tematica = tematicasAdd[i].value;

        this.cholloService.addTematicaInChollo(this.cholloForm.value.id!, tematica).subscribe(
          response => {
            console.log(response);
          }
        );
      }
    }
  }

}
