import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PriceRange } from '../../../models/price-range';

@Component({
  selector: 'app-price-item',
  templateUrl: './price-item.component.html',
  styleUrls: ['./price-item.component.scss']
})
export class PriceItemComponent implements OnInit {
  
  @Input() range!: PriceRange;
  @Output() onChanges = new EventEmitter();
  priceItem = new FormControl(false);
  sub?: Subscription;

  ngOnInit(): void {
    this.priceItem.valueChanges.subscribe(() => {
      if (this.priceItem.value) {
        this.executeAction(true);
      } else {
        this.executeAction(false);
      }
    });
  }

  executeAction(show: boolean) {
    const data: { range: PriceRange, show: boolean } = { range: this.range, show: show };
    this.onChanges.emit(data);
  }

  reset(): void {
    this.priceItem.setValue(false);
  }

}
