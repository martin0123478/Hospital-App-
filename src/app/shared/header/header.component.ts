import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service'
import { Usuario } from '../../models/usuarios.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  public usuario?:Usuario

  constructor(private service:UsuarioService) { 
    this.usuario = service.user;
  }

  ngOnInit(): void {
  }

  logout(){
    this.service.logout()
  }

}
