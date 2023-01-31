import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent {
  @Input() room?: string;
  @Output() onChanges = new EventEmitter();

  roomItem = new FormControl(false);

  ngOnInit(): void {
    this.roomItem.valueChanges.subscribe(() => {
      if (this.roomItem.value) {
        this.executeAction(true);
      } else {
        this.executeAction(false);
      }
    });
  }

  executeAction(show: boolean): void {
    if (this.room) {
      const data: { room: string, show: boolean } = { room: this.room, show: show };
      this.onChanges.emit(data);
    }
  }

  reset(): void {
    this.roomItem.setValue(false);
  }
}
