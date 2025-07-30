import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-Hero',
  templateUrl: './Hero.component.html',
  styleUrls: ['./Hero.component.css'],
  imports: [RouterLink],
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
