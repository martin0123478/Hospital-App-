import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
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
  public  formSubmited = false;
  public auth2:any;
  constructor(private router:Router,
    private fb:FormBuilder,
    private service:UsuarioService) { }

  ngOnInit(): void {
    this.renderButton();
  }

  
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
      this.router.navigateByUrl('/')
    },(err) => {
      Swal.fire('Error',err.error.msg,'error');
    })
    }
    
    
  }

   
    renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        
      });
      this.startApp()
    }

     startApp() {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '330823192387-b1t83i154bpp2tl4um9f6aa4b7ilfcor.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        this.attachSignin(document.getElementById('my-signin2'));
      });
    };

    attachSignin(element:any) {
      
      this.auth2.attachClickHandler(element, {},
          (googleUser:any) => {
             var id_token = googleUser.getAuthResponse().id_token;
            this.service.loginGoogle(id_token).subscribe(resp =>{
              this.router.navigateByUrl('/')

            })
          }, (error:any) => {
            alert(JSON.stringify(error, undefined, 2));
          });
    }


}
