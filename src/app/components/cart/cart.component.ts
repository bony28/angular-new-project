import { Component, computed, inject, signal } from '@angular/core';
import { CartserviceService } from '../../service/cartservice.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styles: ``,
})
export class CartComponent {
  cartService = inject(CartserviceService);
  total = computed(() => {
    let total = 0;
    for (const item of this.cartService.cartItems()) {
      total += total + item.price * item.count;
    }
    return total.toFixed(2);
  });
}
