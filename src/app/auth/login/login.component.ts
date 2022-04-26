import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private router:Router,
    private fb:FormBuilder,
    private service:UsuarioService) { }
  public  formSubmited = false
public loginForm:FormGroup= this.fb.group({
  email:[localStorage.getItem('email') || '',[Validators.required,Validators.email]],
  password:['', Validators.required],
  remember:[false]
 

})


  
  login(){

    if(this.loginForm.invalid){
      return
    }else{
      this.service.loginUsuario(this.loginForm.value)
    .subscribe(created =>{
      if(this.loginForm.get('remember')?.value){
        localStorage.setItem('email',this.loginForm.get('email')?.value)
      }else{
        localStorage.removeItem('email')
      }
      console.log(created)
    },(err) => {
      Swal.fire('Error',err.error.msg,'error');
    })
    }
    
    
  }

}
