import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/Product/Product.service';
import { Product } from '../../../models/Product';
import { CategoryService } from '../../../services/Category/Category.service';
import Swal from 'sweetalert2';
import { Category } from '../../../models/Category';

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
    this.loadCategories();
  }

  products!: Product[];
  categoriesMap = new Map<number, string>();

  getProducts() {
    this._ProductService.getProducts().subscribe({
      next: (res: Product[]) => {
        this.products = res;
        console.log(this.products);
      },
      error: (err) => console.log(err),
    });
  }

  loadCategories() {
    this._CategoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        categories.forEach((cat: Category) =>
          this.categoriesMap.set(cat.id, cat.name)
        );
      },
      error: (err) => console.log(err),
    });
  }

  getCategoryName(categoryId: number): string {
    return this.categoriesMap.get(categoryId) || 'Unknown';
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
