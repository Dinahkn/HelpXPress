import { NeedTeacher } from './../../../model/needTeacher';
import { CityServiceService } from './../../../services/city-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { SubjectSchoolService } from 'src/app/services/subject-school.service';
import { LevelSchoolService } from 'src/app/services/level-school.service';
import { NeedTeacherService } from 'src/app/services/need-teacher.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThrowStmt } from '@angular/compiler';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-dialog-need-teacher',
  templateUrl: './dialog-need-teacher.component.html',
  styleUrls: ['./dialog-need-teacher.component.css']
})
export class DialogNeedTeacherComponent implements OnInit {

  minDate:Date;
  maxDate:Date;
  needTeacherForm!:FormGroup;
  sliceTimeTeacher:FormGroup;
  nameForm:string="עדכון חיפוש מורה פרטי"
  actionBtn:string="שמור"
  public cities:any=[]
  public levelsSchool:any=[]
  public subjectsSchool:any=[]
  constructor( private _formBuilder:FormBuilder,private _authService:AuthentificationService,private _cityService:CityServiceService,private _teacherService:NeedTeacherService,private _levelsService:LevelSchoolService,private _subjectService:SubjectSchoolService,private dialogRef:MatDialogRef<DialogNeedTeacherComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) {
    const currentYear=new Date().getFullYear();
    const currentMonth=new Date().getMonth();
    const currentDay=new Date().getDate();
    this.minDate=new Date(currentYear,currentMonth,currentDay);
    this.maxDate=new Date(currentYear+1,11,32);

    this.sliceTimeTeacher=this._formBuilder.group({
      TimeSlice1:false,
      TimeSlice2:false,
      TimeSlice3:false,
      TimeSlice4:false
    });
   }

  ngOnInit() {
    this.cities=this._cityService.getCities().subscribe({
      next:(res)=>{
        this.cities=res;
      }
    });
    this.levelsSchool=this._levelsService.getLevels().subscribe({
      next:(res)=>{
        this.levelsSchool=res;
      }
    })
    this.subjectsSchool=this._subjectService.getSubjects().subscribe({
      next:(res)=>{
        this.subjectsSchool=res;
      }
    })

    this.needTeacherForm=this._formBuilder.group({
      IDCity:new FormControl('',[Validators.required]),
      DatePossible:new FormControl(''),
      sliceTimeTeacher:this._formBuilder.group({
        TimeSlice1:false,
        TimeSlice2:false,
        TimeSlice3:false,
        TimeSlice4:false
      }),
      IDSubject:new FormControl('',[Validators.required]),
      IDLevel:new FormControl('',[Validators.required]),
      Comments:new FormControl('')
    });
    if(this.editData){
      this.actionBtn="עדכון";
      this.needTeacherForm.controls['IDCity'].setValue(this.editData.IDCity)
      this.needTeacherForm.controls['DatePossible'].setValue(this.editData.DatePossible)
      this.sliceTimeTeacher.controls['TimeSlice1'].setValue(this.editData.TimeSlice1)
      this.sliceTimeTeacher.controls['TimeSlice2'].setValue(this.editData.TimeSlice2)
      this.sliceTimeTeacher.controls['TimeSlice3'].setValue(this.editData.TimeSlice3)
      this.sliceTimeTeacher.controls['TimeSlice4'].setValue(this.editData.TimeSlice4)
      this.needTeacherForm.controls['IDSubject'].setValue(this.editData.IDSubject)
      this.needTeacherForm.controls['IDLevel'].setValue(this.editData.IDLevel)
      this.needTeacherForm.controls['Comments'].setValue(this.editData.Comments)
    }
  }

  updateNeedTeacher(){
    let updNeedTeacher:NeedTeacher={
      IDNeedTeacher:this.editData.IDNeedTeacher,
      IDUser:this.editData.IDUser,
      IDCity:this.needTeacherForm.get("IDCity")?.value,
      DatePossible:this.needTeacherForm.get("DatePossible")?.value,
      TimeSlice1:this.sliceTimeTeacher.get("TimeSlice1")?.value,
      TimeSlice2:this.sliceTimeTeacher.get("TimeSlice2")?.value,
      TimeSlice3:this.sliceTimeTeacher.get("TimeSlice3")?.value,
      TimeSlice4:this.sliceTimeTeacher.get("TimeSlice4")?.value,
      IDSubject:this.needTeacherForm.get("IDSubject")?.value,
      IDLevel:this.needTeacherForm.get("IDLevel")?.value,
      Comments:this.needTeacherForm.get("Comments")?.value
    };
    this._teacherService.putNeedTeacher(updNeedTeacher,updNeedTeacher.IDNeedTeacher,this._authService.shareData)
    .subscribe({
      next:()=>{
        alert("עודכן בהצלחה")
        this.dialogRef.close()
      },
      error:()=>{
        alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
      }
    })
  }

}
