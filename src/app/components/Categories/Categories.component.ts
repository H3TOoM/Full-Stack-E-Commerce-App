import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Category } from '../../models/Category';
import { CategoryService } from '../../services/Category/Category.service';

@Component({
  selector: 'app-Categories',
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(private _Category: CategoryService,
   private _Router:Router,
   private cdr: ChangeDetectorRef
  ) {}

  categories!: Category[];

  ngOnInit() {}

  getCategories() {
    this._Category.getCategories().subscribe({
      next: (response: Category[]) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  goToCategory(categoryName: string) {
    this._Router.navigate(['/all-products/category'], { queryParams: { name: categoryName } });
  }

}
