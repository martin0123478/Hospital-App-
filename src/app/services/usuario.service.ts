import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form-interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import {tap,map, catchError} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';
const url = environment.base_url;
declare const gapi:any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private auth2:any;
  public user:Usuario | undefined;
 

  constructor(private http:HttpClient,
              private router:Router,
              private ngZone:NgZone) { 
                this.googleInit()
              }

  googleInit(){
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '330823192387-b1t83i154bpp2tl4um9f6aa4b7ilfcor.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
    });
  }

  logout(){
    localStorage.removeItem('token')
    this.auth2.signOut().then(()=>{
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login')
      })
    })
   
  }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap( (resp:any) =>{
        
        const{
          email,
          google,
          nombre,
          role,
          img,
          uid
        } = resp.usuario
        this.user = new Usuario(nombre,email,'',img,google,role,uid);
     
        localStorage.setItem('token',resp.token)
      }),
      map(resp =>true),
      catchError( error => of(false))
    );
  }

  crearUsuario(formData:RegisterForm){
   return this.http.post(`${url}/usuarios`,formData)
   .pipe(
    tap( (resp:any) =>{
      localStorage.setItem('token',resp.token)
    })
  )
    
  }

  loginUsuario(formData:LoginForm){
    return this.http.post(`${url}/login`,formData)
     .pipe(
       tap( (resp:any) =>{
         localStorage.setItem('token',resp.token)
       })
     )
   }

   loginGoogle(token:any){
    return this.http.post(`${url}/login/google`,{token})
     .pipe(
       tap( (resp:any) =>{
         localStorage.setItem('token',resp.token)
       })
     )
   }
}
