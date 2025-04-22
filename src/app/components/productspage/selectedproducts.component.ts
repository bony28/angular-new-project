import { Component, Input } from '@angular/core';
import { Product } from '../../models/models.interfaces';

@Component({
  selector: 'selected-products-component',
  template: `
    @if (product.isChecked) {
    <li style="font-size: 20px;font-family: sans-serif;">
      {{ product.title }}
    </li>
    }
  `,
})
export class SelectredProductsComponent {
  @Input() product!: Product;
}
