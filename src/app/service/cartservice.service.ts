import { Injectable, signal } from '@angular/core';
import { Product } from '../models/models.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartserviceService {
  cartItems = signal<Product[]>([]);

  handleAddToCart(product: Product) {
    const currentCart = this.cartItems();
    const index = currentCart.findIndex((x) => x.id === product.id);
    if (index > -1) {
      const updatedCart = [...currentCart];
      updatedCart[index] = {
        ...updatedCart[index],
        count: updatedCart[index].count + 1,
      };
      if (updatedCart[index].count > 5) {
        alert('Maximum 5 items can be added to cart for a user');
      } else {
        this.cartItems.set(updatedCart);
      }
    } else {
      this.cartItems.set([...currentCart, { ...product, count: 1 }]);
    }
  }

  handleRemoveFromCart(id: number) {
    const currentCart = this.cartItems();
    const index = currentCart.findIndex((x) => x.id === id);

    if (index > -1) {
      const item = currentCart[index];
      if (item.count > 1) {
        const updatedCart = [...currentCart];
        updatedCart[index] = {
          ...item,
          count: item.count - 1,
        };
        this.cartItems.set(updatedCart);
      } else {
        this.cartItems.set(currentCart.filter((x) => x.id !== id));
      }
    }
  }
  constructor() {}
}
