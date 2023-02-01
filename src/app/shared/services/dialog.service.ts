import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { DialogData } from '../models/dialog-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  confirm(data: DialogData): Observable<boolean>{
    const ref = this.dialog.open(ConfirmDialogComponent, { data });
    return ref.afterClosed();
  }
}
