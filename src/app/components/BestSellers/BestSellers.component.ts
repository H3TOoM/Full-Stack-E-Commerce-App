import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product/Product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-BestSellers',
  templateUrl: './BestSellers.component.html',
  styleUrls: ['./BestSellers.component.css'],
  imports: [CommonModule]
})
export class BestSellersComponent implements OnInit {

  products: any[] = [];
  constructor(private _ProductService:ProductService) { 
    this.getBestSellers();
  }

  ngOnInit() {
    
  }

  getBestSellers(){
    this._ProductService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response.slice(0, 5); 
        console.log('Best Sellers fetched successfully:', this.products);
      },
      error: (error: any) => {
        console.error('Error fetching best sellers:', error);
      }
    });
  }
}
