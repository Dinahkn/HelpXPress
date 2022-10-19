import { LevelSchoolService } from 'src/app/services/level-school.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-dialog-level',
  templateUrl: './dialog-level.component.html',
  styleUrls: ['./dialog-level.component.css']
})
export class DialogLevelComponent implements OnInit {


  levelForm!:FormGroup;
  nameForm:string="הוסף כיתה"
  actionBtn:string="שמור";
  constructor(private formBuilder:FormBuilder,private _authService:AuthentificationService,private _levelsService:LevelSchoolService,private dialogRef:MatDialogRef<DialogLevelComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.levelForm=this.formBuilder.group({
      NameLevel:['',Validators.required]
    })
    if(this.editData){
      this.levelForm.controls['NameLevel'].setValue(this.editData.NameLevel);
      this.actionBtn="עדכון";
      this.nameForm="עדכון כיתה"
    }
  }

  addLevel(){
    if(!this.editData){
      if(this.levelForm.valid){
        this._levelsService.postLevel(this.levelForm.value,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("כיתה הוקלטה בהצלחה!");
            this.levelForm.reset();
            this.dialogRef.close('שמור');
          },
          error:()=>{
            alert("שגיאה בהקלטת כיתה!")
          }
        })
      }
    }
    else{
      this.updateLevel();
    }
  }
  updateLevel(){
    this._levelsService.putLevel(this.levelForm.value,this.editData.IDLevel,this._authService.shareData)
    .subscribe({
      next:(res)=>{
        alert("כיתה עודכנה בהצלחה!");
        this.levelForm.reset();
        this.dialogRef.close('עדכון');
      },
      error:()=>{
        alert("שגיאה בעדכון כיתה!")
      }
    })
  }
}
