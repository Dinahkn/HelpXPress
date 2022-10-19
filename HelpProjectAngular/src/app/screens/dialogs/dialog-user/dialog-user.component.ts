import { UsersService } from 'src/app/services/users.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityServiceService } from 'src/app/services/city-service.service';
import { User } from 'src/app/model/user';
import * as $ from 'jquery';
import { AuthentificationService } from 'src/app/services/authentification.service';


@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {

  userForm!:FormGroup;
  nameForm:string="הוסף אדמין"
  actionBtn:string="שמור";
  hide:boolean=true;
  isEditable = true;

  public cities:any=[];

  constructor(private formBuilder:FormBuilder,private _authService:AuthentificationService,private _userService:UsersService,private _cityService:CityServiceService,private dialogRef:MatDialogRef<DialogUserComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
      this.cities=  this._cityService.getCities().subscribe({
        next:(res)=>{
          this.cities=res;
        }
      })
      this.userForm=this.formBuilder.group({
        FullName:new FormControl('',[
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
        IDCity:new FormControl('',[
          Validators.required
        ]),
        Phone:new FormControl('',[
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(14),
          Validators.pattern('^[0-9]*$')
        ]),
        TZ:new FormControl('',[
          Validators.required,
          Validators.minLength(9),
          Validators.pattern('^[0-9]*$')
        ]),
        Mail:new FormControl('',[
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
        Comments: new FormControl('')
      });

    if(this.editData){
      let LatLng=(this.editData.Latitude).toString()+","+(this.editData.Longitude).toString();
      $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+LatLng+"&key="+MYAPIKEY,
        async(data)=>{
          let res=data.results[0].formatted_address;
          let partsAdress=res.split(',')
          let theAdress=partsAdress[0]
          $('#adress').val(theAdress)
      })
      this.userForm.controls['FullName'].setValue(this.editData.FullName);
      this.userForm.controls['IDCity'].setValue(this.editData.IDCity);
      this.userForm.controls['Phone'].setValue(this.editData.Phone);
      this.userForm.controls['TZ'].setValue(this.editData.TZ);
      this.userForm.controls['Mail'].setValue(this.editData.Mail);
      this.userForm.controls['Comments'].setValue(this.editData.Comments)
      this.actionBtn="עדכון";
      this.nameForm="עדכון משתמש"
    }
  }

  addAdmin(){
    if(!this.editData){
      if(this.userForm.valid){
        var adressToChange=this.userForm.get("adress")?.value||'תחנה מרכזית';
        adressToChange=adressToChange.replace(" ","+");
        let cityName=JSON.parse(JSON.stringify(this._cityService.getCity(this.userForm.get("IDCity")?.value))).CityName;
        try{
          $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressToChange+","+cityName+",+IL&key="+MYAPIKEY,
          async (data)=>{
            let AdminAdd:User={
            FullName:this.userForm.get("FullName")?.value,
            Pswd:this.userForm.get("password")?.value,
            TZ:this.userForm.get("TZ")?.value,
            Mail:this.userForm.get("Mail")?.value,
            Phone:this.userForm.get("Phone")?.value,
            IDCity:this.userForm.get("IDCity")?.value,
            Comments:this.userForm.get("Comments")?.value,
            Latitude: data.results[0].geometry.location.lat,
            Longitude:data.results[0].geometry.location.lng,
            };
            this._userService.postAdmin(AdminAdd,this._authService.shareData)
            .subscribe({
              next:(res)=>{
                alert("אדמין הוקלט בהצלחה!");
                this.userForm.reset();
                this.dialogRef.close('שמור');
              },
              error:()=>{
                alert("שגיאה בהקלטת אדמין!")
              }
            })
          })
        }
        catch(error){
          alert('We have the error:'+error)
        }
      }
    }
    else{
      console.log("update")
      this.updateUser();
    }
  }

  async updateUser(){
    var adressToChange=this.userForm.get("adress")?.value||'תחנה מרכזית';
    adressToChange=adressToChange.replace(" ","+");
    let cityName=JSON.parse(JSON.stringify(await this._cityService.getCity(this.userForm.get("IDCity")?.value))).CityName;
    try{
      $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+adressToChange+","+cityName+",+IL&key=AIzaSyBIlDxFBMUUYcqcR928vAFH35DDQaTgvRg",
      async (data)=>{
        let updateUser:User={
          IDUser:this.editData.IDUser,
          FullName:this.userForm.get("FullName")?.value,
          Pswd:this.userForm.get("password")?.value,
          TZ:this.userForm.get("TZ")?.value,
          Mail:this.userForm.get("Mail")?.value,
          Phone:this.userForm.get("Phone")?.value,
          IDCity:this.userForm.get("IDCity")?.value,
          Comments:this.userForm.get("comments")?.value,
          Latitude: data.results[0].geometry.location.lat,
          Longitude:data.results[0].geometry.location.lng,
        };

        this._userService.putUser(updateUser,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("משתמש עודכן בהצלחה!");
            this.userForm.reset();
            this.dialogRef.close('עדכון');
          },
          error:()=>{
            alert("שגיאה בעדכון משתמש!")
          }
        })
      })
    }
    catch{}
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
