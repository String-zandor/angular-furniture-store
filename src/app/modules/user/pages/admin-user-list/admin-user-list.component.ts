import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, switchMap } from 'rxjs';
import { User } from 'src/app/modules/user/models/user';
import { UserService } from 'src/app/modules/user/services/user.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

  userLists: User[] = []
  displayedColumns = ['userID','username', 'name', 'email', 'phone', 'action']
  clickedRows = new Set<User>();

  constructor(private userService: UserService,
    private auth: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
this.auth.isLoggedIn$.subscribe(console.log)
    this.auth.admin$.pipe(
      switchMap(admin => {
          return (admin?.id) ? this.userService.getUsers() : of(null);
      })
    ).subscribe(user => this.userLists = user!);
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed');
      } else {
        console.log('User canceled');
      }
    });
  }


}
