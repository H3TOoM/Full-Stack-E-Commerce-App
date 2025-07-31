import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product/Product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/Cart/Cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-BestSellers',
  templateUrl: './BestSellers.component.html',
  styleUrls: ['./BestSellers.component.css'],
  imports: [CommonModule],
})
export class BestSellersComponent implements OnInit {
  products: any[] = [];
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService
  ) {
    this.getBestSellers();
  }

  ngOnInit() {}

  getBestSellers() {
    this._ProductService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response.slice(0, 5);
        console.log('Best Sellers fetched successfully:', this.products);
      },
      error: (error: any) => {
        console.error('Error fetching best sellers:', error);
      },
    });
  }

  // Add to cart
  addToCart(id: number, quantity: number = 1) {
    this._ProductService.addTocart(id, quantity).subscribe({
      next: (response) => {
        console.log('success ' + response);

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
}
