import { Component, ElementRef } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-my-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-user.component.html',
  styleUrl: './my-user.component.css'
})
export class MyUserComponent {
  usuario: User | null = null; 
  disabled:boolean = true;
  userForm: FormGroup|null = null;
  constructor(private userService: UsuarioService, private elementRef: ElementRef,  private sharedService: SharedService){
    this.userService.getAllUsers().subscribe({
      next: (usuario)=>{
        console.log(usuario)
        this.usuario = usuario;
        this.userForm = new FormGroup({
          nombre: new FormControl({value: usuario.nombre||"", disabled: this.disabled}),
          apellidos: new FormControl({value: usuario.apellidos||"", disabled: this.disabled}),
          email: new FormControl({value: usuario.email||"", disabled: this.disabled}),
          dni: new FormControl({value: usuario.dni||"", disabled: this.disabled}),
          direccion: new FormControl({value: usuario.direccion||"", disabled: this.disabled}),
          telefono: new FormControl({value: usuario.telefono||"", disabled: this.disabled}),
          fechaNacimiento: new FormControl({value: usuario.fechaNacimiento||"", disabled: this.disabled})
        })
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
      },
      error:(error)=>{

      }
    })
  }
  edit(){
    for (const field in this.userForm?.controls) {
      const control = this.userForm?.get(field);
      control?.enable();
    }
    this.disabled = false;
  }
  cancel(){
    for (const field in this.userForm?.controls) {
      const control = this.userForm?.get(field);
      control?.disable();
    }
    this.disabled = true;
  }
  guardar(){
    let nombre = this.userForm?.get('nombre');
    let apellidos = this.userForm?.get('apellidos');
    let email = this.userForm?.get('email');
    let dni = this.userForm?.get('dni');
    let direccion = this.userForm?.get('direccion');
    let telefono = this.userForm?.get('telefono');
    let fechaNacimiento = this.userForm?.get('fechaNacimiento');

    console.log(nombre);
    console.log(email);
  }
}
