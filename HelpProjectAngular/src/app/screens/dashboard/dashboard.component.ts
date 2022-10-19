import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { DialogUserComponent } from '../dialogs/dialog-user/dialog-user.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userLogged:User=JSON.parse(sessionStorage.getItem('userDetails')||'');
  name:string='';
  constructor(private dialog:MatDialog) {
   }

  ngOnInit(){
  }
  getNameUser():string{
    return this.userLogged.FullName||'';
  }
  onEditUser(){
    this.dialog.open(DialogUserComponent,{
      width:'70%',
      data:this.userLogged
    }).afterClosed();
  }


}
