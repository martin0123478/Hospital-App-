import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private fb:FormBuilder) { }
public registerForm= this.fb.group({
  nombre:['martin',[Validators.required,Validators.minLength(3)]],
  email:['test100@gmail.com',Validators.required],
  password:['123456', Validators.required],
  password2:['123456', Validators.required],
  terminos:[false, Validators.required],

});

  crearUsuario(){
    console.log(this.registerForm.value)
  }
  

  ngOnInit(): void {
  }

}
