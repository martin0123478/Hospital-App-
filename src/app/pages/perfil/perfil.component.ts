import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
 perfilForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre:['abc',Validators.required],
      email:['123',[Validators.required,Validators.email]],
    })
  }

  actualizarPerfil(){
    console.log(this.perfilForm?.value)
  }

}


