import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Chollo } from '../models/chollo.model';
import { Tematica } from '../models/tematica.model';
import { Localidad } from '../models/localidad.model';
import { CholloService } from '../services/chollo.service';
import { TematicaService } from '../services/tematica.service';
import { LocalidadService } from '../services/localidad.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

// import {ThemePalette} from '@angular/material/core';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatSelectModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit{

  chollo:Chollo = new Chollo();
  tematicas: Array<Tematica> = [];
  tematicasChollo: Array<Tematica> = [];
  localidadChollo = new Localidad();
  localidades: Array<Localidad> = [];

  localidadForm = new FormControl();
  chosenTematicas: Tematica[] = [];
  tematicaForm: FormControl = new FormControl(this.chosenTematicas);



  cholloForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    imagen: new FormControl('',  Validators.required),
    descripcion: new FormControl('', Validators.required),
    precioPersona: new FormControl('', Validators.required),
    cantidadPersonas: new FormControl('', Validators.required),
    fechaCaducidad: new FormControl('', Validators.required)
  })

  constructor(private cholloService:CholloService, private tematicaService:TematicaService, private localidadService:LocalidadService,
    private elementRef: ElementRef, private router:Router, private sharedService:SharedService, private formBuilder: FormBuilder){
    }

  ngOnInit(): void {
    this.tematicaService.getAllTematicas().subscribe(tematicas => {
      this.tematicas = tematicas;
    })

    // this.arrayTematicas.forEach(() => this.recipientsFormArray.push(new FormControl(false)));

    this.localidadService.getAllLocalidades().subscribe(localidades => {
      this.localidades = localidades;
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

  setLocalidad(value:any){
    this.chollo.localidad = value;
  }

  minSelectedCheckboxes(min = 1) {
    const validator: Validators = (formArray: FormControl) => {
      if (formArray instanceof FormArray) {
        const totalSelected = formArray.controls
          .map((control) => control.value)
          .reduce((prev, next) => (next ? prev + next : prev), 0);
        return totalSelected >= min ? null : { required: true };
      }
  
      throw new Error('formArray is not an instance of FormArray');
    };
  
    return validator;
  }

  // onCheckChange(value:any) {
  //   const formArray: FormArray = this.tematicaForm.get('myChoices') as FormArray;
  
  //   if(value.target.checked){
  //     formArray.push(new FormControl(value.target.value));

  //   }else{
  //     let i: number = 0;
  
  //     formArray.controls.forEach((ctrl: FormControl) => {
  //       if(ctrl.value == value.target.value) {
  //         // Remove the unselected element from the arrayForm
  //         formArray.removeAt(i);
  //         return;
  //       }
  
  //       i++;
  //     });
  //   }
  // }

  add(){

    console.log(this.cholloForm.valid);
    console.log(this.localidadForm.valid);
    console.log(this.tematicaForm.valid);

    if(this.cholloForm.valid && this.localidadForm.valid && this.tematicaForm.valid){
      
      this.chollo.id = parseInt(this.cholloForm.value.id!);
      this.chollo.titulo = this.cholloForm.value.titulo?.toString();
      this.chollo.imagen = this.cholloForm.value.imagen?.toString();
      this.chollo.descripcion = this.cholloForm.value.descripcion?.toString();
      this.chollo.precioPersona = parseFloat(this.cholloForm.value.precioPersona!);
      this.chollo.cantidadPersonas = parseInt(this.cholloForm.value.cantidadPersonas!);
      this.chollo.fechaCaducidad = new Date(this.cholloForm.value.fechaCaducidad!);

      this.cholloService.addChollo(this.chollo).subscribe(
        response => {
          console.log(response);
        }
      );

      // this.cholloService.addChollo(this.chollo)
      //     .subscribe({
      //       next: (result) => {
      //         if (result != null) {
      //           this.router.navigate(['home']);
      //         }
      //       },
      //       error: (error) => {
      //         if (error.status === 403) {
      //           this.sharedService.setMessage('Usuario o contraseña incorrectos');
      //         } else {
      //           console.error(error);
      //           this.sharedService.setMessage('Ha ocurrido un error');
      //         }
      //         this.sharedService.showToast('error');
      //       },
      //     });

      // let tematicasAdd: any= document.getElementsByClassName("tematicaInput");
      let tematica: string|undefined = '';

      for (let i = 0; i < this.chosenTematicas.length; i++) {
          this.cholloService.addTematicaInChollo(this.cholloForm.value.id!, this.chosenTematicas[i].id!
            ).subscribe({
                next: (result) => {
                  console.log(result);
                  this.ngOnInit();
                },
                error: (error) => {
                  console.log(error);
                  if (error.status === 403) {
                    this.router.navigate(['login']);
                  }else{
                    console.log(error.status);
                  }
                }
              });
      }
    }
  }
}