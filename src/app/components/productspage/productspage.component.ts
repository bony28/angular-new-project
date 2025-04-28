import { Component, inject, Pipe, signal } from '@angular/core';
import { Product } from '../../models/models.interfaces';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './productlist.component';
import { SelectredProductsComponent } from './selectedproducts.component';
import { CommonModule } from '@angular/common';
import { CapitalizeWordsPipePipe } from '../../temp/capitalize-words-pipe.pipe';
import { forkJoin, pipe } from 'rxjs';
import { LowerCaseWordsPipePipe } from '../../temp/lower-case-words-pipe.pipe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productspage',
  imports: [
    FormsModule,
    ProductListComponent,
    SelectredProductsComponent,
    CommonModule,
    CapitalizeWordsPipePipe,
    LowerCaseWordsPipePipe,
  ],
  templateUrl: './productspage.component.html',
  styles: ``,
})
export class ProductspageComponent {
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  category = signal<string[]>([]);
  featuredProduct = signal<Product | null>(null);

  router = inject(Router);

  searchValue = signal<string>('');

  handleProductUpdate(updated: { all: Product[]; filtered: Product[] }) {
    this.products.set(updated.all);
    this.filteredProducts.set(updated.filtered);
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    forkJoin({
      products: this.http.get<Product[]>('https://fakestoreapi.com/products'),
      categories: this.http.get<string[]>(
        'https://fakestoreapi.com/products/categories'
      ),
      featured: this.http.get<Product>('https://fakestoreapi.com/products/1'),
    }).subscribe(({ products, categories, featured }) => {
      const newProducts = products.map((x) => ({
        ...x,
        isChecked: false,
      }));

      this.products.set(newProducts);
      this.filteredProducts.set(newProducts);
      this.category.set(categories);
      this.featuredProduct.set(featured);
    });
  }

  handleSearch(input: string) {
    this.searchValue.set(input);

    const searchText = input.toLowerCase();

    if (searchText === '') {
      this.filteredProducts.set(this.products());
      return;
    }

    const updatedValues = this.products().filter((x) =>
      x.title.toLowerCase().includes(searchText)
    );
    this.filteredProducts.set(updatedValues);
  }
}
