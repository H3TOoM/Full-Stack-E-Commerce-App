import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/Auth/AuthService.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-AdminLogin',
  templateUrl: './AdminLogin.component.html',
  styleUrls: ['./AdminLogin.component.css'],
  imports: [ReactiveFormsModule],
})
export class AdminLoginComponent implements OnInit {
  form!: FormGroup;
  constructor(private _Auth: AuthService, private _Router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {}

  onSubmit() {
    const { email, password } = this.form.value;

    if (email === 'admin@admin.com' && password === 'admin123') {
      Swal.fire({
        title: 'Login Successfully',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
      });

      this._Auth.setLoginAdminStatus(true);

      this._Router.navigate(['seller']);
    } else {
      Swal.fire({
        title: 'Login Failed',
        icon: 'error',
        timer: 1000,
        showConfirmButton: false,
      });
      return;
    }
  }
}
