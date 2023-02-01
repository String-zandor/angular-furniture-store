import { Component, Input } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent {

  // @Input() message?: string;
  // @Input() type?: 'success' | 'error';

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
}

