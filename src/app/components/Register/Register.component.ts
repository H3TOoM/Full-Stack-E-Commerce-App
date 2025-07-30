import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/Auth/AuthService.service';
import sweetAlert from 'sweetalert2';
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
  cdr: ChangeDetectorRef;

  changeState(){
    this.state = this.state === 'register' ? 'login' : 'register';
    this.form.reset();
    this.initForm();
    this.cdr.detectChanges();
  }
  constructor(public _Auth: AuthService,cdr: ChangeDetectorRef) {
    this.cdr = cdr;
  }

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
      const { name, email, password } = this.form.value;

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
            sweetAlert
              .fire({
                title: 'Registration Successful',
                text: 'You have successfully registered!',
                icon: 'success',
                confirmButtonText: 'OK',
              })
              .then(() => {
                this.closeForm();
              });

              window.location.reload();
            console.log('Registration successful', response);
          },
          error: (error: any) => {
            // Reset loading state
            this.isLoading = false;

            // Show error message using sweetAlert
            sweetAlert.fire({
              title: 'Registration Failed',
              text: 'An error occurred during registration. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
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

            // Show success message using sweetAlert
            sweetAlert.fire({
              title: 'Login Successful',
              text: 'You have successfully logged in!',
              icon: 'success',
              confirmButtonText: 'OK',
            })
            .then(() => {
              this.closeForm();
            });

            window.location.reload();
          },
          error: (error: any) => {
            // console.error('Login failed', error);
            this.isLoading = false;

            // Show error message using sweetAlert
            sweetAlert.fire({
              title: 'Login Failed',
              text: 'An error occurred during login. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        });
      }
      this.form.reset();
      this.state = 'register'; // Reset to register state after submission
      console.log('Form submitted successfully', this.form.value);
    } else {
      console.log('Form is invalid', this.form.errors);
    }
    this.cdr.detectChanges();
  }
}
