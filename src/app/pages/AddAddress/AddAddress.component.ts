import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IAddress } from '../../models/IAddress';
import { AddressService } from '../../services/Address/Address.service';
import { IAddAddress } from '../../models/IAddAddress';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-AddAddress',
  templateUrl: './AddAddress.component.html',
  styleUrls: ['./AddAddress.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class AddAddressComponent implements OnInit {
  constructor(
    private _AddressService: AddressService,
    private _Router: Router
  ) {}

  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
    });

    this.getAddress();
  }

  onSubmit() {
    if (this.form.valid) {
      this._AddressService.addAddress(this.form.value).subscribe({
        next: (res) => {
          this.addresses.push(res);

          Swal.fire({
            title: 'Added Successfully',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
          }).then(() => {
            this._Router.navigate(['/cart']);
          });
        },
        error: (err) => console.log(err),
      });
    } else {
      console.log('form is not invalid');
    }
  }

  addresses: IAddress[] = [];
  getAddress() {
    this._AddressService.getAddress().subscribe({
      next: (res) => {
        this.addresses = res;
        console.log(this.addresses);
      },
      error: (err) => console.log(err),
    });
  }
}
