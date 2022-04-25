import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form-interface';
import { environment } from '../../environments/environment';

const url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  crearUsuario(formData:RegisterForm){
   return this.http.post(`${url}/usuarios`,formData)
    
  }
}
