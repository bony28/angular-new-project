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
  templateUrl: './shoppingpage.component.html',
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
