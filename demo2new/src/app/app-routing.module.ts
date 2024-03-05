
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
// import { RegbookComponent } from './regbook/regbook.component';

const routes: Routes = [
  { 
    path:'',
    component: HomeComponent
  },
  { 
    path:'home',
    component: HomeComponent
  },
   {
    path:'login',
    component:LoginComponent
  },

  {
    path:'books',
    component:BooksComponent,
    canActivate:[AuthGuard]
  },{
    path:'register',
    component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
