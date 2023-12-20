import { Component, ElementRef, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SharedService } from '../services/shared.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  email: any = null;
  password: any = null;

  constructor(
    private service: LoginService,
    private sharedService: SharedService,
    private elementRef: ElementRef,
    private router: Router,
    private tokenService: TokenStorageService
  ) {}

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  ngAfterViewInit() {
    var forms =
      this.elementRef.nativeElement.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        'submit',
        function (event: any) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        },
        false
      );
    });
  }

  login() {
    if (this.userForm.valid) {
      this.email = this.userForm.get('email')?.value;
      this.password = this.userForm.get('password')?.value;

      this.service
        .login(this.userForm.value.email, this.userForm.value.password)
        .subscribe({
          next: (result) => {
            if (result.token) {
              this.tokenService.saveToken(result.token);
              this.router.navigate(['home']);
            }
          },
          error: (error) => {
            if (error.status === 403) {
              this.sharedService.setMessage('Usuario o contraseña incorrectos');
            } else {
              console.error(error);
              this.sharedService.setMessage('Ha ocurrido un error');
            }
            this.sharedService.showToast('error');
          },
        });
    }
  }
}
