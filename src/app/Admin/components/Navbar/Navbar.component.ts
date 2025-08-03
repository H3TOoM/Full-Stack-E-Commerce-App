import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/Auth/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _Auth:AuthService,private _Router:Router) { }

  ngOnInit() {
  }

  logout(){
    this._Auth.logout()

    this._Router.navigate(['/'])
  }

}
