import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/Product/Product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/Category/Category.service';
import { CartService } from '../../services/Cart/Cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-RelatedProducts',
  templateUrl: './RelatedProducts.component.html',
  styleUrls: ['./RelatedProducts.component.css'],
  imports: [CommonModule],
})
export class RelatedProductsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private _Categorysevice: CategoryService,
    private _CartService:CartService,
    private _Router: Router
  ) {}

  ngOnInit() {
    this.getAllProducts();
    this.getCategory(this.categoryId);
  }

  @Input() categoryId!: number;

  products!: Product[];
  getAllProducts() {
    this._ProductService.getProducts().subscribe({
      next: (res: Product[]) => {
        this.products = res;
      },
      error: (err) => console.log(err),
    });
  }

  relatedProducts!: Product[];

  // 1- get category by id
  category!: Category;
  getCategory(categoryId: number) {
    this._Categorysevice.getCategoryById(categoryId).subscribe({
      next: (res: Category) => {
        this.category = res;
        this.filterByCategory(this.category.name);
      },
      error: (err) => console.log(err),
    });
  }

  // 2- filter product by catorgory using API
  filterByCategory(name: string) {
    this._ProductService.filterByCategory(name).subscribe({
      next: (res) => {
        this.relatedProducts = res;
      },
      error: (err) => console.log(err),
    });
  }

  // Add to cart
    addToCart(id: number, quantity: number = 1) {
      this._ProductService.addTocart(id, quantity).subscribe({
        next: (response) => {
  
          // Fetch total items count
          let totalItems = 0;
          for (let item of response.items) {
            totalItems += item.quantity;
          }
  
          this._CartService.setCartCount(totalItems);
  
          // success message
          Swal.fire({
            title: 'Added To Cart Successfully',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
          });
        },
        error: (error) => console.log(error),
      });
    }
  

  goTProductDetails(id: number) {
    this._Router.navigate([`/product-details/${id}`]);
    window.scrollTo(0,0)
  }
}
