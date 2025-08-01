import { Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/Home.component';
import { AllProductsComponent } from './pages/AllProducts/AllProducts.component';
import { CartComponent } from './pages/Cart/Cart.component';
import { AddAddressComponent } from './pages/AddAddress/AddAddress.component';
import { authGuard } from './guards/auth-guard';
import { SellerComponent } from './pages/Seller/Seller.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'all-products',component:AllProductsComponent},
    {path:'cart',component:CartComponent,canActivate:[authGuard]},
    {path:'all-products/category',component:AllProductsComponent},
    {path:'add-address',component:AddAddressComponent},
    {path:'seller' , component:SellerComponent , canActivate:[authGuard]}
];
