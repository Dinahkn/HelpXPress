
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide = true;
  signInForm!: FormGroup;
  public validation_msgs = {
    'emailControl':[
      {type:'pattern',message:'חייב להקליד מייל תקין'},
      {type:'required',message:'חייב להקליד מייל'}
    ],
    'passwordControl':[
      {type:'required',message:'חייב להקליד סיסמה'},
    ]
  }
  public loginAuth:Login={};
  public userLogged:User={};

  constructor(private _formBuilder: FormBuilder,private _userService:UsersService,private _authService:AuthentificationService,private _router: Router) {}
  ngOnInit():void{
    this.signInForm=this._formBuilder.group({
      eMailUser:new FormControl('',[
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      passWordUser:new FormControl('',[Validators.required])
    })
  }
  async getUserJWT(){
    this.userLogged= await this._userService.getUserByJWT(this._authService.shareData);
  }
  async onSubmit() {
    try{
      this.loginAuth.email=this.signInForm.get("eMailUser")?.value,
      this.loginAuth.password=this.signInForm.get("passWordUser")?.value
      this._authService.shareData=await this._authService.login(this.loginAuth);
      await this.getUserJWT();
      if(this.userLogged.RoleUser==='User'){
        sessionStorage.setItem('userDetails',JSON.stringify(this.userLogged));
        this._router.navigateByUrl('/Dashboard');
      }
      else if(this.userLogged.RoleUser==='Admin'){
        sessionStorage.setItem('userDetails',JSON.stringify(this.userLogged));
        this._router.navigateByUrl('/AdminPart');
      }
    }
    catch{
      alert("אימייל או סיסמא לא נכונים")
    }
  }
}
