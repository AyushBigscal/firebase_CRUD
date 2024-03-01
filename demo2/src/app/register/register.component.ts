import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  regForm!:FormGroup;


  constructor(private fb:FormBuilder) { }

   ngOnInit(): void {
    this.regForm = this.fb.group({
      username:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      phone:['',[Validators.required]],

    })
  }
  tosubmitreg() {
    if(this.regForm.valid){
      console.log(this.regForm.value);

    }
  }
}
