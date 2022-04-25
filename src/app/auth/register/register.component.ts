import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private fb:FormBuilder,
              private usuarioService:UsuarioService
              ) { }
  public  formSubmited = false
public registerForm:FormGroup= this.fb.group({
  nombre:['test111',[Validators.required,Validators.minLength(3)]],
  email:['test100@gmail.com',[Validators.required,Validators.email]],
  password:['1234567', Validators.required],
  password2:['1234567', Validators.required],
  terminos:[true, Validators.required],

},{
  validators:this.passwordIguales('password','password2')
});

  crearUsuario(){
    this.formSubmited = true;
    console.log(this.registerForm.value)
    if(this.registerForm.invalid){
      return;
    }else{
     this.usuarioService.crearUsuario(this.registerForm.value)
     
     .subscribe(resp=> {
      console.log('usuario creado')
     console.log(resp)
     },(err) => {
       Swal.fire('Error',err.error.msg,'error');
     })
  }
}

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if((pass1 !== pass2) && this.formSubmited){
      return true;
    }else{
      return false
    }
  }

  campoNoValido(campo:string):boolean{
    if(this.registerForm.get(campo)?.invalid && this.formSubmited){
      return true;
    }else{
      return false
    }
  }

  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmited
  }

  passwordIguales(pass1Name:string,pass2Name:string){
    return ( formGroup:FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if(pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null)
      }else{
        pass2Control?.setErrors({noEsIgual:true})
      }
    }
  }
  

  ngOnInit(): void {
  }

}
