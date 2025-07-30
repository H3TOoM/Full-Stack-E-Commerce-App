import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-Categories',
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css'],
  imports: [RouterLink]
})
export class CategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
