import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth/AuthService.service';
import { RegisterComponent } from '../Register/Register.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CartService } from '../../services/Cart/Cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css'],
  imports: [RouterLink, RegisterComponent, CommonModule, FormsModule],
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
  cartItemsCount: number = 0;

  constructor(
    private _Auth: AuthService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _CartService: CartService,
    private _Router: Router
  ) {}

  isLoggedIn = false;

  ngOnInit() {
    this._Auth.IsLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });

    this._CartService.cartCount$.subscribe((count) => {
      this.cartItemsCount = count;
    });
  }
  openForm() {
    this._Auth.isFormOpen = true;
    this.cdr.detectChanges();
    this.closeMobileMenu();
    console.log('Form opened:', this._Auth.isFormOpen);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    this._Auth.logout(); 
    this.closeMobileMenu();
  }
}
