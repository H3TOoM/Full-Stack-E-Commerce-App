import { Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/Home.component';
import { AllProductsComponent } from './pages/AllProducts/AllProducts.component';
import { CartComponent } from './pages/Cart/Cart.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'all-products',component:AllProductsComponent},
    {path:'cart',component:CartComponent},
    {path:'all-products/category',component:AllProductsComponent},
];
