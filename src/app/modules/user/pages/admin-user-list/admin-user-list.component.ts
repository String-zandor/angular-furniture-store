import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, merge, mergeMap, Observable, of, Subscription, switchMap } from 'rxjs';
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
  sub?: Subscription

  private subject = new BehaviorSubject<any[]>([]);
  userLists$: Observable<any[]> = this.subject.asObservable();

  constructor(private userService: UserService,
    private auth: AuthService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }



    ngOnInit(): void {
      this.customerList()
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
        this.auth.isActive(id, { active: true }).subscribe();
        this.snackBar.open('User activated sucessfully!','',{duration: 2000})
        this.customerList()
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
        this.auth.isActive(id, { active: false }).subscribe();
        this.snackBar.open('User deactivated sucessfully!','',{duration: 2000})
        this.customerList()
      }
    })
  }

  customerList(){
    this.userLists = this.auth.getAllUsers().pipe(
      mergeMap(users => this.userService.getUsers().pipe(
        map(authUsers => {
          return users.map(obj1 => {
            const match = authUsers.filter(obj2 => obj1.id === obj2.id)[0];
            return match ? { ...obj1, ...match } : obj1;
          });
        })
      )),
      map(result => result.filter(user => user.role === 'USER'))
    );
  }
}
