import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  errorMessage: string = '';
 showForm!:FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private fb:FormBuilder
    ){ }

    ngOnInit(): void {
    this.showForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
  // onSubmit(){
  //   if(this.showForm.valid){
  //     console.log(this.showForm.value);

  //   }
  // }

  login(): void {
    if (this.authService.login(this.showForm.value.username,this.showForm.value.password)) {
      alert("SuccessFully logged in....")
      this.router.navigate(['/books']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
