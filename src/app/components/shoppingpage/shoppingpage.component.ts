import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/models.interfaces';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartserviceService } from '../../service/cartservice.service';

@Component({
  selector: 'app-shoppingpage',
  imports: [FormsModule],
  template: `
    <button
      style="border: none;background-color: red;color: white;padding: 10px;"
      (click)="handleCartButton()"
    >
      Cart
    </button>
    @for (item of products(); track item.id) {
    <div style="flex: 1;padding: 10px;">
      <div>
        <img
          [src]="item.image"
          alt="Image"
          style="height: 200px;height: 100px;"
        />
        <p class="text-sm font-semibold">{{ item.title }}</p>
        <p class="text-green-600 font-medium">{{ item.price }}</p>
      </div>
      <button
        style="border: none;background-color: red;color: white;padding: 10px;"
        (click)="cartService.handleAddToCart(item)"
      >
        Add to Cart
      </button>
    </div>

    }
  `,
  styles: ``,
})
export class ShoppingpageComponent {
  products = signal<Product[]>([]);
  router = inject(Router);

  cartService = inject(CartserviceService);
  async ngOnInit() {
    const res = await fetch('https://fakestoreapi.com/products');

    const data = await res.json();
    const newData = data.map((x: Product) => ({
      ...x,
      isChecked: false,
    }));
    this.products.set(newData);
  }

  handleCartButton() {
    this.router.navigate(['/cart']);
  }
}
