import { Component, OnInit } from '@angular/core';
import { HeroComponent } from "../../components/Hero/Hero.component";
import { CategoriesComponent } from "../../components/Categories/Categories.component";
import { BannerComponent } from "../../components/Banner/Banner.component";
import { BestSellersComponent } from "../../components/BestSellers/BestSellers.component";

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  imports: [HeroComponent, CategoriesComponent, BannerComponent, BestSellersComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
