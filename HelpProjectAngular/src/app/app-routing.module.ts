import { ResultsSearchComponent } from './screens/results-search/results-search.component';
import { OfferHelpComponent } from './screens/offer-help/offer-help.component';
import { NeedHelpComponent } from './screens/need-help/need-help.component';
import { ContactUsComponent } from './screens/contact-us/contact-us.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { LogOutComponent } from './screens/log-out/log-out.component';
import { SignInComponent } from './screens/sign-in/sign-in.component';
import { RegisterComponent } from './screens/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './screens/home-page/home-page.component';
import { AdminDashboardComponent } from './screens/admin-dashboard/admin-dashboard.component';
import { OfferBoardComponent } from './screens/offer-board/offer-board.component';
import { SearchBoardComponent } from './screens/search-board/search-board.component';
import { ForgotPasswordComponent } from './screens/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './screens/reset-password/reset-password.component';
import { SeeResultsComponent } from './screens/see-results/see-results.component';


const routes: Routes = [
  {path:'Home',component:HomePageComponent},
  {path:'Register',component:RegisterComponent},
  {path:'SignIn',component:SignInComponent},
  {path:'LogOut',component:LogOutComponent},
  {path:'Dashboard',component:DashboardComponent},
  {path:'ContactUs',component:ContactUsComponent},
  {path:'NeedHelp',component:NeedHelpComponent},
  {path:'OfferHelp',component:OfferHelpComponent},
  {path:'Results',component:ResultsSearchComponent},
  {path:'AdminPart',component:AdminDashboardComponent},
  {path:'UsersOffer',component:OfferBoardComponent},
  {path:'UsersNeed',component:SearchBoardComponent},
  {path:'ForgotPassword',component:ForgotPasswordComponent},
  {path:'ResetPassword',component:ResetPasswordComponent},
  {path:'SeeResults',component:SeeResultsComponent},
  {path:'**',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
