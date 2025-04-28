import { Component, Input } from '@angular/core';
import { Product } from '../../models/models.interfaces';

@Component({
  selector: 'selected-products-component',
  templateUrl: './selectedproducts.component.html',
})
export class SelectredProductsComponent {
  @Input() product!: Product;
}
