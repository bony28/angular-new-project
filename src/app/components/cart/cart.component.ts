import { Component, computed, inject, signal } from '@angular/core';
import { CartserviceService } from '../../service/cartservice.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [],
  template: `
    @for (item of cartService.cartItems(); track item.id) {
    <div style="flex: 1;padding: 10px;">
      <div>
        <img
          [src]="item.image"
          alt="Image"
          style="height: 120px; width: 150px; object-fit: cover; border-radius: 4px;"
        />
        <p style="font-size: 14px; font-weight: 600; margin: 8px 0 4px;">
          {{ item.title }}
        </p>
        <p style="color: #4caf50; font-weight: 500; margin-bottom: 8px;">
          {{ item.price }}
        </p>
        <div>
          <button
            (click)="cartService.handleRemoveFromCart(item.id)"
            style="
          border: none;
          background-color: #e53935;
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        "
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    }
    <div>Total: {{ total() }}</div>
  `,
  styles: ``,
})
export class CartComponent {
  cartService = inject(CartserviceService);
  total = computed(() => {
    let total = 0;
    for (const item of this.cartService.cartItems()) {
      total += total + item.price;
    }
    return total;
  });
}
