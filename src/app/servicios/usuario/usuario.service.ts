import { Injectable } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { MiHttpService } from '../http/mi-http.service';
import { promise } from 'protractor';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private miUsuario: Usuario, private miHttp: MiHttpService) { }

  getIdUsuario(){
    return this.miUsuario.id;
  }
  setIdUsuario(data){
    this.miUsuario.id = data;
  }

  getNombreUsuario(){
    return this.miUsuario.nombre;
  }
  setNombreUsuario(data){
    this.miUsuario.nombre = data;
  }

  getApellidoUsuario(){
    return this.miUsuario.apellido;
  }
  setApellidoUsuario(data){
    this.miUsuario.apellido = data;
  }

  getMailUsuario(){
    return this.miUsuario.mail;
  }
  setMailUsuario(data){
    this.miUsuario.mail = data;
  }

  getPasswordUsuario(){
    return this.miUsuario.password;
  }
  setPasswordUsuario(data){
    this.miUsuario.password = data;
  }

  getTipoUsuario(){
    return this.miUsuario.tipo;
  }
  setTipoUsuario(data){
    this.miUsuario.tipo = data;
  }

  traerTodosLosUsuarios(): Promise<any>{
    return this.miHttp.httpGetP('traerTodosLosUsuarios')
    .then (data => {
      console.log(data);
      return data;
    })
  }

  traerUsuarioPorId(data): Promise<any>{
    return this.miHttp.httpPostP('traerUsuarioPorId',data)
    .then (data => {
      console.log(data);
      return data;
    })
  }

  modificarUsuario(data): Promise<any>{
    return this.miHttp.httpPostP('modificarUsuario',data)
    .then (data => {
      console.log(data);
      return data;
    })
  }
}
