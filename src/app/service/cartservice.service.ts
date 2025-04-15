import { Injectable, signal } from '@angular/core';
import { Product } from '../models/models.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  cartItems = signal<Product[]>([]);

  handleAddToCart(product: Product) {
    this.cartItems.set([...this.cartItems(), product]);
  }

  handleRemoveFromCart(id: number) {
    this.cartItems.set(this.cartItems().filter((p) => p.id !== id));
  }
  constructor() {}
}
