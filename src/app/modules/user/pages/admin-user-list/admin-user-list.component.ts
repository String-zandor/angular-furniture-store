import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, merge, mergeMap, Observable, of, switchMap } from 'rxjs';
import { User, UserCred } from 'src/app/modules/user/models/user';
import { UserService } from 'src/app/modules/user/services/user.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

  userLists: any
  displayedColumns = ['userID', 'username', 'name', 'email', 'phone', 'action']

  private subject = new BehaviorSubject<any[]>([]);
  userLists$: Observable<any[]> = this.subject.asObservable();

  constructor(private userService: UserService,
    private auth: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.auth.getAllUsers().pipe(
      mergeMap(users => this.userService.getUsers().pipe(
        map(authUsers => {
          return users.map(obj1 => {
            const match = authUsers.filter(obj2 => obj1.id === obj2.id)[0];
            return match ? { ...obj1, ...match } : obj1;
          });
        })
      ))
    ).subscribe(result => {
      this.userLists = result.filter(user => user.role === 'USER')
    });
  }

  activateUser(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirm',
      content: 'Are you sure you want to activate this user?',
      confirm: 'Yes',
      cancel: 'No'
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.auth.isActive(id, { active: true }).subscribe(res => console.log(res));
      }
    })
  }

  deactivateUser(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirm',
      content: 'Are you sure you want to deactivate this user?',
      confirm: 'Yes',
      cancel: 'No'
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.auth.isActive(id, { active: false }).subscribe(res => console.log(res));
      }
    })
  }
}
