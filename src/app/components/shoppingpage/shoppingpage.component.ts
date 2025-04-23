import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/models.interfaces';
import { CommonModule, JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartserviceService } from '../../service/cartservice.service';
import { HttpClient } from '@angular/common/http';
import { mergeMap, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-shoppingpage',
  imports: [FormsModule, CommonModule],
  template: `
    <!-- Cart Button -->
    <div style="text-align: right; padding: 1rem;">
      <button
        style="
      border: none;
      background-color: #ff5722;
      color: white;
      padding: 10px 16px;
      border-radius: 6px;
      font-size: 15px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    "
        (click)="handleCartButton()"
      >
        🛒 Cart
      </button>
    </div>

    <!-- Products Grid -->
    <div
      style="
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1rem;
    background-color: #fafafa;
  "
    >
      @for (item of products(); track item.id) {
      <div
        style="
        flex: 1 1 250px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        display: flex;
        flex-direction: column;
        align-items: center;
      "
      >
        <img
          [src]="item.image"
          alt="Image"
          style="
          height: 160px;
          width: 160px;
          object-fit: contain;
          margin-bottom: 12px;
        "
        />
        <p
          style="font-size: 14px; font-weight: 600; margin: 6px 0; text-align: center;"
        >
          {{ item.title }}
        </p>
        <p
          style="color: #4caf50; font-weight: 500; font-size: 14px; margin-bottom: 12px;"
        >
          ₹{{ item.price }}
        </p>

        <button
          (click)="cartService.handleAddToCart(item)"
          style="
          border: none;
          background-color: #1976d2;
          color: white;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        "
          [ngStyle]="{
            'background-color': item.count === 5 ? 'grey' : 'blue'
          }"
        >
          ➕ Add to Cart
        </button>
      </div>
      }
    </div>
  `,
  styles: ``,
})
export class ShoppingpageComponent {
  products = signal<Product[]>([]);
  router = inject(Router);

  cartService = inject(CartserviceService);

  constructor(private http: HttpClient) {}

  // ngOnInit() {
  //   of(null)
  //     .pipe(
  //       switchMap(() =>
  //         this.http.get<Product[]>('http://fakestoreapi.com/products')
  //       )
  //     )
  //     .subscribe((data) => {
  //       const newData = data.map((x) => ({
  //         ...x,
  //         isChecked: false,
  //       }));
  //       this.products.set(newData);
  //     });
  // }

  ngOnInit() {
    of(null)
      .pipe(
        mergeMap(() =>
          this.http.get<Product[]>('http://fakestoreapi.com/products')
        )
      )
      .subscribe((data) => {
        const newData = data.map((x) => ({
          ...x,
          isChecked: false,
        }));
        this.products.set(newData);
      });
  }

  handleCartButton() {
    this.router.navigate(['/cart']);
  }
}
