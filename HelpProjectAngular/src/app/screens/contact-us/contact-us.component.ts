import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactForm } from 'src/app/model/contactForm';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/services/users.service';
import { DialogUserComponent } from '../dialogs/dialog-user/dialog-user.component';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  myContactForm!:FormGroup;
  name!:FormControl;
  email!: FormControl;
  subject!:FormControl;
  body!:FormControl;
  public userLogged:User=JSON.parse(sessionStorage.getItem('userDetails')||'');

  constructor(private fb:FormBuilder,private _userService:UsersService,private dialog:MatDialog) { }
  getNameUser():string{
    return this.userLogged.FullName||'';
  }
  onEditUser(){
    this.dialog.open(DialogUserComponent,{
      width:'100%',
      data:this.userLogged
    }).afterClosed();
  }

  ngOnInit() {
    this.email=new FormControl('',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.name=new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(40),Validators.pattern('^[a-zA-Z\-\u0590-\u05FF, ]*$')]);
    this.subject=new FormControl('',[Validators.required]);
    this.body=new FormControl('',[Validators.required]);
    this.myContactForm=this.fb.group({
      email:this.email,
      name:this.name,
      subject:this.subject,
      body:this.body
    })
  }

  isLogged():boolean{
    if(sessionStorage.length!=0 && JSON.parse(sessionStorage.getItem('userDetails')||'')!=''){
      return true;
    }
    else{
      sessionStorage.setItem('userDetails',JSON.stringify(''))
      return false
    }
  }

  onSubmit(){
    try{
      let contactInfo:ContactForm={
        Email:this.myContactForm.get("email")?.value,
        Name:this.myContactForm.get("name")?.value,
        Subject:this.myContactForm.get("subject")?.value,
        Body:this.myContactForm.get("body")?.value
      }
      this._userService.contactUs(contactInfo)
        .subscribe({
          next:()=>{
            alert("קיבלנו הפנייה שלך בהצלחה! נעדכן אותך");
            this.myContactForm.reset();
          },
          error:()=>{
            alert("שגיאה בשליחת הטופס!")
          }
      })
    }
    catch(error){}
  }
}
