import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ForgotPassword } from 'src/app/model/forgotPassword';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  insertForm!: FormGroup;
  email!: FormControl;
  constructor(private fb:FormBuilder,private _userService:UsersService) { }

  ngOnInit(): void {
    this.email=new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
    this.insertForm=this.fb.group({
      email:this.email
    })
  }
  onSubmit(){
    try{
      let userInfo:ForgotPassword={
        Email:this.insertForm.get("email")?.value,
      }
      this._userService.forgetPassword(userInfo)
        .subscribe({
          next:()=>{
            this.insertForm.reset();
            alert("קיבלת מייל כדי לאפס סיסמה. תבדוק אותם! תודה");

          },
          error:()=>{
            alert("שגיאה בשליחת מייל! תיצור קשר עם האדמין")
          }
      })
    }
    catch(error){}
  }

}
