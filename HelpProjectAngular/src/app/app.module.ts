import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './screens/register/register.component';
import { HomePageComponent } from './screens/home-page/home-page.component';
import { SignInComponent } from './screens/sign-in/sign-in.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { LogOutComponent } from './screens/log-out/log-out.component';
import { ContactUsComponent } from './screens/contact-us/contact-us.component';
import { OfferHelpComponent } from './screens/offer-help/offer-help.component';
import { NeedHelpComponent } from './screens/need-help/need-help.component';
import { ResultsSearchComponent } from './screens/results-search/results-search.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AdminDashboardComponent } from './screens/admin-dashboard/admin-dashboard.component';
import { DialogCityComponent } from './screens/dialogs/dialog-city/dialog-city.component';
import { DialogLevelComponent } from './screens/dialogs/dialog-level/dialog-level.component';
import { DialogConfirmComponent } from './screens/dialogs/dialog-confirm/dialog-confirm.component';
import { DialogSubjectComponent } from './screens/dialogs/dialog-subject/dialog-subject.component';
import { DialogUserComponent } from './screens/dialogs/dialog-user/dialog-user.component';
import { DialogOfferCarpoolComponent } from './screens/dialogs/dialog-offer-carpool/dialog-offer-carpool.component';
import { OfferBoardComponent } from './screens/offer-board/offer-board.component';
import { SearchBoardComponent } from './screens/search-board/search-board.component';
import { DialogOfferBabysitterComponent } from './screens/dialogs/dialog-offer-babysitter/dialog-offer-babysitter.component';
import { DialogOfferTeacherComponent } from './screens/dialogs/dialog-offer-teacher/dialog-offer-teacher.component';
import { DialogNeedBabysitterComponent } from './screens/dialogs/dialog-need-babysitter/dialog-need-babysitter.component';
import { DialogNeedCarpoolComponent } from './screens/dialogs/dialog-need-carpool/dialog-need-carpool.component';
import { DialogNeedTeacherComponent } from './screens/dialogs/dialog-need-teacher/dialog-need-teacher.component';
import { ForgotPasswordComponent } from './screens/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './screens/reset-password/reset-password.component';
import { SeeResultsComponent } from './screens/see-results/see-results.component';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SignInComponent,
    DashboardComponent,
    RegisterComponent,
    LogOutComponent,
    ContactUsComponent,
    OfferHelpComponent,
    NeedHelpComponent,
    ResultsSearchComponent,
    AdminDashboardComponent,
    DialogCityComponent,
    DialogLevelComponent,
    DialogConfirmComponent,
    DialogSubjectComponent,
    DialogUserComponent,
    DialogOfferCarpoolComponent,
    OfferBoardComponent,
    SearchBoardComponent,
    DialogOfferBabysitterComponent,
    DialogOfferTeacherComponent,
    DialogNeedBabysitterComponent,
    DialogNeedCarpoolComponent,
    DialogNeedTeacherComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SeeResultsComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    MaterialModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
