import { Component, ElementRef, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements AfterViewInit {
  nombre: any = null;
  email: any = null;
  password: any = null;

  constructor(
    private service: SignUpService,
    private sharedService: SharedService,
    private elementRef: ElementRef,
    private router: Router
  ) {}

  userForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
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

  signUp() {
    if (this.userForm.valid) {
      this.nombre = this.userForm.get('nombre')?.value;
      this.email = this.userForm.get('email')?.value;
      this.password = this.userForm.get('password')?.value;

      this.service
        .signUp(
          this.userForm.value.nombre,
          this.userForm.value.email,
          this.userForm.value.password
        )
        .subscribe({
          next: (result: any) => {
            if (result.id) {
              this.sharedService.showToast('sucess');
              this.sharedService.setMessage('Usuario creado con éxito');
              this.router.navigate(['login']);
            }
          },
          error: (error: any) => {
            console.error(error);
            this.sharedService.setMessage('Ha ocurrido un error');
            this.sharedService.showToast('error');
          },
        });
    }
  }
}
