import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/Product/Product.service';
import { Product } from '../../models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/Cart/Cart.service';
import Swal from 'sweetalert2';
import { RelatedProductsComponent } from '../../components/RelatedProducts/RelatedProducts.component';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-ProductDetails',
  templateUrl: './ProductDetails.component.html',
  styleUrls: ['./ProductDetails.component.css'],
  imports: [RelatedProductsComponent],
})
export class ProductDetailsComponent implements OnInit ,AfterViewInit{
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _Route: ActivatedRoute,
    private _Router: Router
  ) {}

  ngOnInit() {
    this._Route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if(id)
        this.getProduct(id);
    })
  }

  ngAfterViewInit() {

   
      
  }

  product!: Product;

  getProduct(id: number) {
    this._ProductService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res;
        // console.log(this.product);
      },
      error: (err) => {
        console.log(err);
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

  buyNow(id: number) {
    this.addToCart(id);

    this._Router.navigate(['/cart']);
  }


 
    

}
