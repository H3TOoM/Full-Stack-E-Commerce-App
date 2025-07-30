import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product/Product.service';

@Component({
  selector: 'app-AllProducts',
  templateUrl: './AllProducts.component.html',
  styleUrls: ['./AllProducts.component.css']
})
export class AllProductsComponent implements OnInit {

  constructor(private _ProductService:ProductService) {
    this.getProducts();
   }

  ngOnInit() {
  }

  products: any[] = [];
  getProducts(){
    this._ProductService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response.$values || response;
        // Log the products to the console for debugging
        console.log('Products fetched successfully:', this.products);
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    })
  }


  

  

}
