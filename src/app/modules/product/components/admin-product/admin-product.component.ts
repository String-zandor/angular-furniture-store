import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {
  @Input() product?: Product;
  @Output() onAction = new EventEmitter();

  executeAction(action: string): void {
    if (this.product) {
      const data: { id: number, action: string } = { id: this.product.id, action: action };
      this.onAction.emit(data);
    }
  }
   
}
