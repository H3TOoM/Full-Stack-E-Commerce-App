import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/Navbar/Navbar.component';
import { FooterComponent } from './components/Footer/Footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('client-side');

  isSeller: boolean = false;
  constructor(private _Router: Router) {
    this._Router.events.subscribe((even: any) => {
      if (even.url) {
        this.isSeller = even.url.startsWith('/seller');
      }
    });
  }

  ngOnInit() {}
}
