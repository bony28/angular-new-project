import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/models.interfaces';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './productlist.component';
import { SelectredProductsComponent } from './selectedproducts.component';

@Component({
  selector: 'app-productspage',
  imports: [FormsModule, ProductListComponent, SelectredProductsComponent],
  template: `
    <div style="padding: 2rem;">
      <input
        type="text"
        placeholder="Search"
        [ngModel]="searchValue()"
        (ngModelChange)="handleSearch($event)"
        style="width: 100%; max-width: 300px; padding: 10px 14px; font-size: 1rem; border: 1px solid black;"
      />

      <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
        <button
          style="width: 100%; max-width: 200px; padding: 10px 14px; font-size: 1rem; border: none; background-color: cadetblue; border-radius: 5px; color: white; cursor: pointer;"
          (click)="router.navigate(['/shopping'])"
        >
          Visit Shopping Site
        </button>

        <button
          style="width: 100%; max-width: 200px; padding: 10px 14px; font-size: 1rem; border: none; background-color: orange; border-radius: 5px; color: white; cursor: pointer;"
          (click)="router.navigate(['/main'])"
        >
          Back
        </button>
      </div>

      <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Products</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        @for (item of filteredProducts(); track item.id) {
        <product-component
          [product]="item"
          [filteredProducts]="filteredProducts()"
          [products]="products()"
          (productsChange)="handleProductUpdate($event)"
        ></product-component>
        }
      </div>

      <div style="margin-top: 2rem;">
        <h2>Selected Products</h2>
        <ul>
          @for (item of filteredProducts(); track item.id) {
          <selected-products-component
            [product]="item"
          ></selected-products-component>
          }
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class ProductspageComponent {
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);

  router = inject(Router);

  searchValue = signal<string>('');

  handleProductUpdate(updated: { all: Product[]; filtered: Product[] }) {
    this.products.set(updated.all);
    this.filteredProducts.set(updated.filtered);
  }

  async ngOnInit() {
    const res = await fetch('https://fakestoreapi.com/products');

    const data = await res.json();
    const newData = data.map((x: Product) => ({
      ...x,
      isChecked: false,
    }));
    this.products.set(newData);
    this.filteredProducts.set(newData);
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
