import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/Product/Product.service';
import { Product } from '../../../models/Product';
import { CategoryService } from '../../../services/Category/Category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ProductList',
  templateUrl: './ProductList.component.html',
  styleUrls: ['./ProductList.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _CategoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  products!: Product[];

  getProducts() {
    this._ProductService.getProducts().subscribe({
      next: (res: Product[]) => {
        this.products = res;
        console.log(this.products);
      },
      error: (err) => console.log(err),
    });
  }

  getCategory(id: number) {
    this._CategoryService.getCategoryById(id).subscribe({
      next: (res) => {
        return res;
      },
      error: (err) => console.log(err),
    });
  }

  deleteProduct(id: number) {
    this._ProductService.deleteProduct(id).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Product Deleted Successfully!',
          icon: 'success',
          showConfirmButton: false,
        });

        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }
}
