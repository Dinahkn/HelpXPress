import { CityServiceService } from '../../../services/city-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dialog-city',
  templateUrl: './dialog-city.component.html',
  styleUrls: ['./dialog-city.component.css']
})
export class DialogCityComponent implements OnInit {

  cityForm!:FormGroup;
  nameForm:string="הוסף עיר"
  actionBtn:string="שמור";
  constructor(private formBuilder:FormBuilder,private _authService:AuthentificationService,private _cityService:CityServiceService,private dialogRef:MatDialogRef<DialogCityComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.cityForm=this.formBuilder.group({
      CityName:['',Validators.required]
    })
    if(this.editData){
      this.cityForm.controls['CityName'].setValue(this.editData.CityName);
      this.actionBtn="עדכון";
      this.nameForm="עדכון עיר"
    }
  }

  async addCity(){
    if(!this.editData){
      if(this.cityForm.valid){
        this._cityService.postCity(this.cityForm.value,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("עיר הוקלט בהצלחה!");
            this.cityForm.reset();
            this.dialogRef.close('שמור');
          },
          error:()=>{
            alert("שגיאה בהקלטת עיר!")
          }
        })
      }
    }
    else{
      this.updateCity();
    }
  }
  updateCity(){
    this._cityService.putCity(this.cityForm.value,this.editData.IDCity,this._authService.shareData)
    .subscribe({
      next:(res)=>{
        alert("עיר עודכן בהצלחה!");
        this.cityForm.reset();
        this.dialogRef.close('עדכון');
      },
      error:()=>{
        alert("שגיאה בעדכון עיר!")
      }
    })
  }

}
