import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/Auth/AuthService.service';
import { RegisterComponent } from '../Register/Register.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css'],
  imports: [RouterLink, RegisterComponent, CommonModule, NgIf],
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;

  constructor(private _Auth: AuthService, private cdr: ChangeDetectorRef) {}

  token!: string | null;
  ngOnInit() {
    this.token = localStorage.getItem('token');
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = null;
    this.cdr.detectChanges();
    window.location.reload();
  }
}
