import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product/Product.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-AllProducts',
  templateUrl: './AllProducts.component.html',
  styleUrls: ['./AllProducts.component.css'],
  imports: [FormsModule],
})
export class AllProductsComponent implements OnInit {
  constructor(
    private _ProductService: ProductService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  categoryName: string = 'All Products';

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const categoryName = params['name'];
      if (categoryName) {
        this.filterByCategory(categoryName);
        this.categoryName = categoryName;
      } else {
        this.categoryName = 'All Products';
        this.getProducts();
      }
    });
  }

  products: any[] = [];
  getProducts() {
    this._ProductService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response;
        // Log the products to the console for debugging
        console.log('Products fetched successfully:', this.products);
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  selectedCategory: string = '0'; // Default to '0' for all products

  filterByCategory(name: string) {
    if (name === '0') {
      // If the name is '0', fetch all products
      this.getProducts();
      this.categoryName = 'All Products'; // Reset category name
      return;
    } else {
      this._ProductService.filterByCategory(name).subscribe({
        next: (response: any[]) => {
          window.scrollTo(0, 0); // Scroll to the top of the page
          this.products = response;
          // Log the filtered products to the console for debugging
          this.categoryName = name; // Update the category name
          this.cdr.detectChanges(); // Ensure the view updates after filtering
          console.log(
            `Products filtered by category "${name}":`,
            this.products
          );
        },
        error: (error: any) => {
          console.error(
            `Error filtering products by category "${name}":`,
            error
          );
        },
      });
    }
  }

  
 
}
