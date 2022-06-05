import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuarios.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public usuario?:Usuario
  menuItems :any[] = []

  constructor(private side:SidebarService,
    private usuarioService:UsuarioService) {
    this.menuItems = side.menu;
    this.usuario = usuarioService.user;
   }

  ngOnInit(): void {
  }

}
