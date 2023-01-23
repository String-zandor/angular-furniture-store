import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {

  @Input() category?: string;
  @Output() onChanges = new EventEmitter();

  categoryItem = new FormControl(false);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryItem.valueChanges.subscribe(() => {
      if (this.categoryItem.value) {
        this.executeAction(true);
      } else {
        this.executeAction(false);
      }
    });
  }

  executeAction(show: boolean): void {
    if (this.category) {
      const data: { category: string, show: boolean } = { category: this.category, show: show };
      this.onChanges.emit(data);
    }
  }

}
