import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service'



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:any = null;
  password:any = null;

  constructor(private service:LoginService){}

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  login(){

    this.email = this.userForm.get('email')?.value;
    this.password = this.userForm.get('password')?.value;


    this.service.login(this.userForm.value.email,this.userForm.value.password).subscribe(result => {
      if(result.result){
        
      }
    })
  }
}
