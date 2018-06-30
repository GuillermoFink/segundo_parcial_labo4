import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../servicios/usuario/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tipoUsuario: number;
  constructor(private miServicioUsuario: UsuarioService) { }

  ngOnInit() {
    this.tipoUsuario = this.miServicioUsuario.getTipoUsuario();
  }

}
