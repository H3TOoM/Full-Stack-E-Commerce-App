import { Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/Home.component';
import { AllProductsComponent } from './pages/AllProducts/AllProducts.component';
import { CartComponent } from './pages/Cart/Cart.component';
import { AddAddressComponent } from './pages/AddAddress/AddAddress.component';
import { authGuard } from './guards/auth-guard';
import { ProductDetailsComponent } from './pages/ProductDetails/ProductDetails.component';
import { MyOrdersComponent } from './pages/MyOrders/MyOrders.component';
import { SellerComponent } from './Admin/pages/Seller/Seller.component';
import { AddProductComponent } from './Admin/pages/AddProduct/AddProduct.component';
import { ProductListComponent } from './Admin/pages/ProductList/ProductList.component';
import { AllOrdersComponent } from './Admin/pages/AllOrders/AllOrders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'all-products', component: AllProductsComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'all-products/category', component: AllProductsComponent },
  { path: 'add-address', component: AddAddressComponent },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [authGuard] },
  {
    path: 'seller',
    component: SellerComponent,
    canActivate:[authGuard],

    children: [
      { path: '', component: AddProductComponent }, // default
      { path: 'product-list', component: ProductListComponent },
      { path: 'all-orders', component: AllOrdersComponent },
    ],
  },
];
