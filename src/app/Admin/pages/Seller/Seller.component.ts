import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/Navbar/Navbar.component';
import { SidebarComponent } from '../../components/Sidebar/Sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/Auth/AuthService.service';
import { AdminLoginComponent } from '../AdminLogin/AdminLogin.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Seller',
  templateUrl: './Seller.component.html',
  styleUrls: ['./Seller.component.css'],
  standalone:true,
  imports: [NavbarComponent, SidebarComponent, RouterOutlet,AdminLoginComponent,CommonModule],
})
export class SellerComponent implements OnInit {
  isAdminLoggedIn: boolean = false;

  constructor(private _Auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this._Auth.IsAdminLoggedIn$.subscribe((status) => {
      this.isAdminLoggedIn = status;
      this.cdr.detectChanges();
    });
  }
}
