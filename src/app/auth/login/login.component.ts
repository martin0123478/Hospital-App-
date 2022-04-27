import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
    private fb:FormBuilder,
    private service:UsuarioService) { }

  ngOnInit(): void {
    this.renderButton();
  }

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

   onSuccess(googleUser:any) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token )
  }

  onFailure(error:any) {
    console.log(error);
  }
    renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': this.onSuccess,
        'onfailure': this.onFailure
      });
    }

}
