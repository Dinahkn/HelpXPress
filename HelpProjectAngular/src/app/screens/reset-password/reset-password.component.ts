import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ResetPassword } from 'src/app/model/resetPassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  hidePass = true;
  hideConf = true;
  resetPassForm !:FormGroup;
  email!:FormControl;
  password!:FormControl;
  confirmPassword!:FormControl;

  constructor(private _formBuilder: FormBuilder,private _userService:UsersService) { }

  ngOnInit(){
    this.email=new FormControl('',
    [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ])
    this.password=new FormControl('',
    [
      Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      matchValidators('confirmPassword',true)
    ])
    this.confirmPassword= new FormControl('',
    [
      Validators.required,
      matchValidators('password')
    ])
    this.resetPassForm=this._formBuilder.group({
      email:this.email,
      password:this.password,
      confirmPassword:this.confirmPassword
    })
  }

  onSubmit()
  {
    try{
      let resetUserInfo:ResetPassword={
        email:this.resetPassForm.get("email")?.value,
        password:this.resetPassForm.get("password")?.value
      }
      this._userService.resetPassword(resetUserInfo)
      .subscribe({
        next:()=>{
          alert("קיבלת מייל כדי אם אישור איפוס סיסמה. תבדוק אותם! תודה");
          this.resetPassForm.reset();
        },
        error:()=>{
          alert("שגיאה בשליחת מייל! תיצור קשר עם האדמין")
        }
      })
    }
    catch(error){}
  }
}

export function matchValidators (matchTo:string,reverse?:boolean):ValidatorFn{
  return(control:AbstractControl):ValidationErrors|null=>{
    if(control.parent&&reverse){
      const c=(control.parent?.controls as any)[matchTo] as AbstractControl;
      if(c){
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent&&!!control.parent.value&&control.value===(control.parent?.controls as any)[matchTo].value?null:{matching:true};
  }
}

