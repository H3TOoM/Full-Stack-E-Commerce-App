import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/Auth/AuthService.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  state: string = 'register';
  isLoading: boolean = false;

  changeState() {
    this.state = this.state === 'register' ? 'login' : 'register';
    this.form.reset();
    this.initForm();
    this.cdr.detectChanges();
  }
  constructor(public _Auth: AuthService, private cdr: ChangeDetectorRef) {}

  closeForm() {
    this._Auth.isFormOpen = false;
    this.initForm();
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    if (this.state === 'register') {
      this.form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    } else {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Extract values from the form
      const { email, password } = this.form.value;
      const name = this.state === 'register' ? this.form.value.name : null;

      // Perform registration or login based on the state
      if (this.state === 'register') {
        this.isLoading = true; // Set loading state
        this._Auth.register(this.form.value).subscribe({
          next: (response: any) => {
            this.isLoading = false; // Reset loading state
            // Assuming the response contains a token and user information
            const token = response.token;
            localStorage.setItem('token', token);

            const user = response.user;
            localStorage.setItem('user', JSON.stringify(user));

            // Show success message using sweetAlert
            Swal.fire({
              title: 'Registration Successful',
              icon: 'success',
              showConfirmButton: false,
            }).then(() => {
              this.closeForm();
              this._Auth.setLoginStatus(true);
            });

            this._Auth.setLoginStatus(true);

            console.log('Registration successful', response);
          },
          error: (error: any) => {
            // Reset loading state
            this.isLoading = false;

            // Show error message using sweetAlert
            Swal.fire({
              title: 'Registration Failed',
              icon: 'error',
              showConfirmButton: false,
            });
            console.error('Registration failed', error);
          },
        });
      } else {
        this._Auth.login(email, password).subscribe({
          next: (response: any) => {
            // console.log('Login successful', response);
            this.isLoading = false;

            // Store token and user in localStorage
            const token = response.token;
            localStorage.setItem('token', token);

            // Store user in localStorage
            const user = response.user;
            localStorage.setItem('user', JSON.stringify(user));

            this._Auth.setLoginStatus(true);

            // Show success message using sweetAlert
            Swal.fire({
              title: 'Login Successful',
              icon: 'success',
              showConfirmButton: false,
            }).then(() => {
              this.closeForm();
            });

            // Update UI
            this.cdr.detectChanges();
          },
          error: (error: any) => {
            // console.error('Login failed', error);
            this.isLoading = false;

            // Show error message using sweetAlert
            Swal.fire({
              title: 'Login Failed',
              icon: 'error',
              showConfirmButton: false,
            });
          },
        });
      }
      this.form.reset();
      // console.log('Form submitted successfully', this.form.value);
    } else {
      // console.log('Form is invalid', this.form.errors);

      Swal.fire({
        title: 'Form Is Invalid',
        icon: 'error',
        showConfirmButton: false,
      });
    }
    this.cdr.detectChanges();
  }
}
