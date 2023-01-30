import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/user/models/user';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {

  userLists?: User[]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(user => {
      this.userLists = user;
    })
  }
}
