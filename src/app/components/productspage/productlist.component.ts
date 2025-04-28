import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Product } from '../../models/models.interfaces';

@Component({
  selector: 'product-component',
  templateUrl: './productlist.component.html',
})
export class ProductListComponent {
  @Input() product!: Product;
  @Input() products: Product[] = [];
  @Input() filteredProducts: Product[] = [];

  @Output() productsChange = new EventEmitter<{
    all: Product[];
    filtered: Product[];
  }>();

  onChangeCheck(id: number, event: Event) {
    debugger;
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    const updatedValues = this.filteredProducts.map((x) => ({
      ...x,
      isChecked: x.id === id ? checked : x.isChecked,
    }));

    this.productsChange.emit({ all: updatedValues, filtered: updatedValues });
  }
}
