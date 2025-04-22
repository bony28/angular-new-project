import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Product } from '../../models/models.interfaces';

@Component({
  selector: 'product-component',
  template: `
    <div
      style="flex: 1 1 calc(45% - 1rem); padding: 1rem; background-color: #fff; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);"
    >
      <label
        style="font-size: 20px;font-weight: 100;font-family: sans-serif;cursor: pointer;"
      >
        <input
          type="checkbox"
          [checked]="product!.isChecked"
          (change)="onChangeCheck(product!.id, $event)"
          style="cursor: pointer;"
        />
        {{ product!.title }}
      </label>
    </div>
  `,
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
