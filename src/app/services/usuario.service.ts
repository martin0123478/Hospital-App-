import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form-interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import {tap,map, catchError} from 'rxjs/operators'
import { Observable, of } from 'rxjs';
const url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  validarToken():Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${url}/login/renew`,{
      headers:{
        'x-token':token
      }
    }).pipe(
      tap( (resp:any) =>{
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
