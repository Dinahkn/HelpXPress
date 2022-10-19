
import { CityServiceService } from './../../services/city-service.service';
import * as $ from 'jquery';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  hide1:boolean=true;
  hide2:boolean=true;
  registerForm!: FormGroup;
  isEditable = true;

  public cities:any=[];
  constructor(private _formBuilder: FormBuilder, private _userService:UsersService,private _cityService:CityServiceService) { }

  async ngOnInit(){
    this.cities=  this._cityService.getCities().subscribe({
      next:(res)=>{
        this.cities=res;
      }
    })
    this.registerForm=this._formBuilder.group({
      fullName:new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40),
        Validators.pattern('^[a-zA-Z\-\u0590-\u05FF, ]*$')
      ]),
      adress: new FormControl('',[
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern('^[a-zA-Z0-9\-\u0590-\u05FF, ]*$')
      ]),
      city:new FormControl('',[
        Validators.required
      ]),
      phone:new FormControl('',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(14),
        Validators.pattern('^[0-9]*$')
      ]),
      tzRegister:new FormControl('',[
        Validators.required,
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$'),

      ]),
      emailRegister:new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      password:new FormControl('',[
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
        matchValidators('confirmPassword',true)
      ]),
      confirmPassword: new FormControl('',[
        Validators.required,
        matchValidators('password')
      ]),
      comments: new FormControl('')
    });
  };

  async onSubmit(){
    var adressToChange=this.registerForm.get("adress")?.value||'תחנה מרכזית';
    adressToChange=adressToChange.replace(" ","+");
    let cityName=JSON.parse(JSON.stringify(await this._cityService.getCity(this.registerForm.get("city")?.value))).CityName
    try{
      $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressToChange+","+cityName+",+IL&key="+MYAPIKEY,
      async (data)=>{
        console.log(data)
        let userM:User={
        FullName:this.registerForm.get("fullName")?.value,
        Pswd:this.registerForm.get("password")?.value,
        TZ:this.registerForm.get("tzRegister")?.value,
        Mail:this.registerForm.get("emailRegister")?.value,
        Phone:this.registerForm.get("phone")?.value,
        IDCity:this.registerForm.get("city")?.value,
        Comments:this.registerForm.get("comments")?.value,
        Latitude: data.results[0].geometry.location.lat,
        Longitude:data.results[0].geometry.location.lng,
        };
        this._userService.postUser(userM)
        .subscribe({
          next:()=>{
            alert("נרשמת בהצלחה");
            this.registerForm.reset();
          },
          error:()=>{
            alert("שגיאה בהרשמה! תיצור קשר עם האדמין")
          }
        });
      })
    }
    catch(error){}

  }

  onReset() {
    this.registerForm.reset();
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

