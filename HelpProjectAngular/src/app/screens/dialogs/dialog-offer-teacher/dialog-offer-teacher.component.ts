import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfferTeacher } from 'src/app/model/offerTeacher';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CityServiceService } from 'src/app/services/city-service.service';
import { LevelSchoolService } from 'src/app/services/level-school.service';
import { OfferTeacherService } from 'src/app/services/offer-teacher.service';
import { SubjectSchoolService } from 'src/app/services/subject-school.service';

@Component({
  selector: 'app-dialog-offer-teacher',
  templateUrl: './dialog-offer-teacher.component.html',
  styleUrls: ['./dialog-offer-teacher.component.css']
})
export class DialogOfferTeacherComponent implements OnInit {

  nameForm:string="עדכון הצעת מורה פרטי"
  actionBtn:string="שמור";
  minDate:Date;
  maxDate:Date;
  offerTeacherForm!:FormGroup;
  sliceTimeTeacher:FormGroup;
  public cities:any=[];
  public levelsSchool:any =[];
  public subjectsSchool:any=[];
  constructor(private dialog:MatDialog,private _formBuilder:FormBuilder,private _authService:AuthentificationService,private _cityService:CityServiceService,private _teacherService:OfferTeacherService, private _levelsService:LevelSchoolService,private _subjectService:SubjectSchoolService,private dialogRef:MatDialogRef<DialogOfferTeacherComponent>,@Inject(MAT_DIALOG_DATA) public editData:any) {
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
    this.offerTeacherForm=this._formBuilder.group({
      IDCity:new FormControl('',[Validators.required]),
      IDSubject:new FormControl('',[Validators.required]),
      IDLevel:new FormControl('',[Validators.required]),
      DatePossible:new FormControl(''),
      Price:new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0)
      ]),
      YearsExperience:new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(0)
      ]),
      sliceTimeTeacher:this._formBuilder.group({
        TimeSlice1:false,
        TimeSlice2:false,
        TimeSlice3:false,
        TimeSlice4:false
      }),
      Comments:new FormControl('')
    });
    if(this.editData){
      this.actionBtn="עדכון";
      this.offerTeacherForm.controls['IDCity'].setValue(this.editData.IDCity)
      this.offerTeacherForm.controls['IDSubject'].setValue(this.editData.IDSubject)
      this.offerTeacherForm.controls['IDLevel'].setValue(this.editData.IDLevel)
      this.offerTeacherForm.controls['DatePossible'].setValue(this.editData.DatePossible)
      this.sliceTimeTeacher.controls['TimeSlice1'].setValue(this.editData.TimeSlice1)
      this.sliceTimeTeacher.controls['TimeSlice2'].setValue(this.editData.TimeSlice2)
      this.sliceTimeTeacher.controls['TimeSlice3'].setValue(this.editData.TimeSlice3)
      this.sliceTimeTeacher.controls['TimeSlice4'].setValue(this.editData.TimeSlice4)
      this.offerTeacherForm.controls['YearsExperience'].setValue(this.editData.YearsExperience)
      this.offerTeacherForm.controls['Price'].setValue(this.editData.Price)
      this.offerTeacherForm.controls['Comments'].setValue(this.editData.Comments)
    }
  }

  updateTeacher(){
    let updateTeach:OfferTeacher={
      IDUser:this.editData.IDUser,
      IDTeacher:this.editData.IDTeacher,
      IDCity:this.offerTeacherForm.get("IDCity")?.value,
      Price:this.offerTeacherForm.get("Price")?.value,
      IDSubject:this.offerTeacherForm.get("IDSubject")?.value,
      IDLevel:this.offerTeacherForm.get("IDLevel")?.value,
      YearsExperience:this.offerTeacherForm.get("YearsExperience")?.value,
      DatePossible:this.offerTeacherForm.get("DatePossible")?.value,
      TimeSlice1:this.sliceTimeTeacher.get("TimeSlice1")?.value,
      TimeSlice2:this.sliceTimeTeacher.get("TimeSlice2")?.value,
      TimeSlice3:this.sliceTimeTeacher.get("TimeSlice3")?.value,
      TimeSlice4:this.sliceTimeTeacher.get("TimeSlice4")?.value,
    };
    this._teacherService.putOfferTeacher(updateTeach,updateTeach.IDTeacher,this._authService.shareData)
    .subscribe({
      next:()=>{
        alert("עודכן בהצלחה!")
        this.dialogRef.close()
      },
      error:()=>{
        alert("בעייה בהקלטה! תנסה שוב ותיצור קשר עם האדמין")
      }
    });
  }


}
