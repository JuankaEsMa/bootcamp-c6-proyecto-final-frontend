import { Component, ElementRef } from '@angular/core';
import { UsuarioService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-user.component.html',
  styleUrl: './my-user.component.css'
})
export class MyUserComponent{
  usuario: User | null = null; 
  disabled:boolean = true;
  userForm: FormGroup|null = null;
  constructor(private userService: UsuarioService, private elementRef: ElementRef, private router: Router,
    private sharedService: SharedService){
    this.userService.getAllUsers().subscribe({
      next: (usuario)=>{
        console.log(usuario)
        this.usuario = usuario;
        this.userForm = new FormGroup({
          nombre: new FormControl({value: usuario.nombre||"", disabled: this.disabled},[Validators.required]),
          apellidos: new FormControl({value: usuario.apellidos||"", disabled: this.disabled},[Validators.required]),
          email: new FormControl({value: usuario.email||"", disabled: this.disabled},[Validators.required, Validators.email]),
          dni: new FormControl({value: usuario.dni||"", disabled: this.disabled},[Validators.required]),
          direccion: new FormControl({value: usuario.direccion||"", disabled: this.disabled}),
          telefono: new FormControl({value: usuario.telefono||"", disabled: this.disabled}),
          fechaNacimiento: new FormControl({value: usuario.fechaNacimiento||"", disabled: this.disabled},[Validators.required, Validators.pattern("^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$")])
        })
      },
      error:(error)=>{

      }
    })
  }
  delete(){
    if(this.usuario != null){
      this.userService.deleteUser().subscribe();
    }
  }
  edit(){
    this.userForm?.enable();
    this.disabled = false;
  }
  cancel(){
    this.userForm?.disable();
    this.disabled = true;
    this.usuario = this.usuario;
  }
  guardar(){
    var forms = document.getElementById("userForm");
    if(forms != undefined){
      if(this.userForm?.invalid){
        forms.classList.add('was-validated');
      }else{
        forms.classList.remove('was-validated');
        let nombre = this.userForm?.get('nombre')?.value;
        let apellidos = this.userForm?.get('apellidos')?.value;
        let email = this.userForm?.get('email')?.value;
        let dni = this.userForm?.get('dni')?.value;
        let direccion = this.userForm?.get('direccion')?.value;
        let telefono = this.userForm?.get('telefono')?.value;
        let fechaNacimiento = this.userForm?.get('fechaNacimiento')?.value;
        let user:User = {
          id: this.usuario?.id,
          nombre: nombre,
          apellidos: apellidos,
          email: email,
          dni: dni,
          direccion: direccion,
          telefono: telefono,
          fechaNacimiento: fechaNacimiento
        }
        this.userService.updateUsuario(user).subscribe({
          next: (result) =>{
            console.log(result);
            if(result.email != this.usuario?.email){
              this.router.navigate(["/login"])
            }
          },
          error: (error) =>{
            console.log(error);
          }
        });
        this.disabled = true;
        this.userForm?.disable();
      }
    }
  }
}
