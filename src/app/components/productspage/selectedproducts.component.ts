import { Component, Input } from '@angular/core';
import { Product } from '../../models/models.interfaces';

@Component({
  selector: 'selected-products-component',
  template: `
    @if (product.isChecked) {
    <li>{{ product.title }}</li>
    }
  `,
})
export class SelectredProductsComponent {
  @Input() product!: Product;
}
