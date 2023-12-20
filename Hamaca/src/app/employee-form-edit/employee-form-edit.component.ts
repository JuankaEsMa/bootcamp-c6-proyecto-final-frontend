import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chollo } from '../models/chollo.model';
import { Tematica } from '../models/tematica.model';
import { CholloService } from '../services/chollo.service';
import { TematicaService } from '../services/tematica.service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employee-form-edit.component.html',
  styleUrl: './employee-form-edit.component.css'
})
export class EmployeeFormEditComponent implements OnInit, AfterViewInit{

  id:any = '';
  chollo:Chollo = new Chollo();
  tematicas: Array<Tematica> = [];

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

  constructor(private tematicaService:TematicaService, private cholloService:CholloService, private route:ActivatedRoute, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.tematicaService.getAllTematicas().subscribe(tematicas => {
      this.tematicas = tematicas;
    })

    this.route.params.subscribe(param => 
      this.id = param['id']);
    this.set_inputs();
  }

  ngAfterViewInit() {
    var forms = this.elementRef.nativeElement.querySelectorAll('.needs-validation');
    console.log(forms);
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

  set_inputs(){
    console.log(this.id);
    this.cholloService.getCholloById(this.id).subscribe((data:any) => {
  
      console.log(data);

      this.chollo = data;

      // this.cholloForm.setValue(data);

        this.cholloForm.setValue({
          id: this.chollo.id?.toString()!,
          titulo: this.chollo.titulo ?? "",
          imagen: this.chollo.imagen ?? "",
          descripcion: this.chollo.descripcion?? "",
          precioPersona: this.chollo.precioPersona?.toString() ?? "",
          cantidadPersonas: this.chollo.cantidadPersonas?.toString() ?? "",
          fechaCaducidad: this.chollo.fechaCaducidad?.toString() ?? "",
          localidad: this.chollo.localidad?.toString() ?? "",
        });
        
        // this.cholloForm.value.titulo = this.chollo.titulo;
        // this.cholloForm.value.imagen = this.chollo.imagen;
        // this.cholloForm.value.descripcion = this.chollo.descripcion;
        // this.cholloForm.value.precioPersona = this.chollo.precioPersona?.toString();
        // this.cholloForm.value.cantidadPersonas = this.chollo.cantidadPersonas?.toString();
        // this.cholloForm.value.fechaCaducidad = this.chollo.fechaCaducidad?.toString();
        // this.cholloForm.value.localidad = this.chollo.localidad?.toString();

        this.chollo = data;
        this.id = this.chollo.id;
        console.log('Voila:'+this.id);
      
        let tematicas: any= document.getElementsByClassName("tematicaInput");

        for (let i = 0; i < tematicas.length; i++) {
          console.log('Voila:'+tematicas[i].value);
          if(this.chollo.tematicas === tematicas[i].value){
            tematicas[i].checked = true;
          }
        }      
    })
  }

  setCholloValues(){
    this.cholloService.getCholloById(this.id.toString()).subscribe((data:any) => {
      this.chollo = data;
      if(data != null){
        this.chollo.id = parseInt(this.cholloForm.value.id!);
        this.chollo.titulo = this.cholloForm.value.titulo?.toString();
        this.chollo.imagen = this.cholloForm.value.imagen?.toString();
        this.chollo.descripcion = this.cholloForm.value.descripcion?.toString();
        this.chollo.precioPersona = parseFloat(this.cholloForm.value.precioPersona!);
        this.chollo.cantidadPersonas = parseInt(this.cholloForm.value.cantidadPersonas!);
        this.chollo.fechaCaducidad = new Date(this.cholloForm.value.fechaCaducidad!);
        this.chollo.localidad = this.cholloForm.value.localidad?.toString();

        this.id = this.chollo.id;

        let tematicas: any= document.getElementsByClassName("tematicaInput");

        for (let i = 0; i < tematicas.length; i++) {
          console.log(tematicas[i].value);
          if(tematicas[i].checked){
            this.chollo.tematicas = tematicas[i].value;
          }
        }      
      }
    })
  }

  update(){

      this.setCholloValues();

      this.cholloService.updateChollo(this.id, this.chollo).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
