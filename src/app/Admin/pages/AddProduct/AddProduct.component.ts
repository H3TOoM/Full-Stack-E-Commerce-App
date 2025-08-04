import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/Product/Product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-AddProduct',
  templateUrl: './AddProduct.component.html',
  styleUrls: ['./AddProduct.component.css'],
  imports: [ReactiveFormsModule],
})
export class AddProductComponent implements OnInit {
  constructor(private _ProductService: ProductService) {}

  ngOnInit() {}

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    categoryId: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
  });

  selectedImage: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      this.form.get('image')?.setValue(this.selectedImage);
    }
  }

  onSubmit() {
    if (this.form.valid && this.selectedImage) {

      console.log("called")
      this._ProductService
        .addProduct(this.form.value, this.selectedImage)
        .subscribe({
          next: () => {
            Swal.fire({
              title: 'Added Successfully',
              icon: 'success',
              showConfirmButton: false,
              timer:1000
            });

            this.form.reset()

          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }
}
