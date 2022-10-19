import { SubjectSchoolService } from 'src/app/services/subject-school.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-dialog-subject',
  templateUrl: './dialog-subject.component.html',
  styleUrls: ['./dialog-subject.component.css']
})
export class DialogSubjectComponent implements OnInit {

  subjectForm!:FormGroup;
  nameForm:string="הוסף מקצוע"
  actionBtn:string="שמור";
  constructor(private formBuilder:FormBuilder,private _authService:AuthentificationService,private _subjectService:SubjectSchoolService,private dialogRef:MatDialogRef<DialogSubjectComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) { }

  ngOnInit(): void {
    this.subjectForm=this.formBuilder.group({
      NameSubject:['',Validators.required]
    })
    if(this.editData){
      this.subjectForm.controls['NameSubject'].setValue(this.editData.NameSubject);
      this.actionBtn="עדכון";
      this.nameForm="עדכון מקצוע"
    }
  }

  addSubject(){
    if(!this.editData){
      if(this.subjectForm.valid){
        this._subjectService.postSubject(this.subjectForm.value,this._authService.shareData)
        .subscribe({
          next:(res)=>{
            alert("נושא הוקלט בהצלחה!");
            this.subjectForm.reset();
            this.dialogRef.close('שמור');
          },
          error:()=>{
            alert("שגיאה בהקלטת נושא!")
          }
        })
      }
    }
    else{
      this.updateSubject();
    }
  }
  updateSubject(){
    this._subjectService.putSubject(this.subjectForm.value,this.editData.IDCity,this._authService.shareData)
    .subscribe({
      next:(res)=>{
        alert("נושא עודכן בהצלחה!");
        this.subjectForm.reset();
        this.dialogRef.close('עדכון');
      },
      error:()=>{
        alert("שגיאה בעדכון נושא!")
      }
    })
  }


}
