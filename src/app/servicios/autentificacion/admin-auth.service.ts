import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private miRouter: Router, private miServicioUsuario: UsuarioService) {
    try {
      let data = localStorage.getItem('token');
      let payload = data.split('.')[1];
      let pay2 = payload.replace('-', '+').replace('_', '/');
      let datos = JSON.parse(atob(pay2));
      console.log("datos del token");
      this.miServicioUsuario.setApellidoUsuario(datos['data'][0]['apellido']);
      this.miServicioUsuario.setIdUsuario(datos['data'][0]['id']);
      this.miServicioUsuario.setMailUsuario(datos['data'][0]['mail']);
      this.miServicioUsuario.setNombreUsuario(datos['data'][0]['nombre']);
      this,miServicioUsuario.setTipoUsuario(datos['data'][0]['tipo']);
    } catch (e) {
      console.log(e);
    }
   }

  canActivate() {
    var aprobacion = false;
    //capturo token del local storage
    let data = localStorage.getItem('token');
    //decodifico token
    let payload = data.split('.')[1];
    let pay2 = payload.replace('-', '+').replace('_', '/');
    let datos = JSON.parse(atob(pay2));
    console.log(datos);
    console.log(datos['data']['tipo']);
    //comparo y si el tipo coincide acepto
    if (datos['data'][0]['tipo'] == 10) {
      aprobacion = true;
    }else{
      this.miRouter.navigate(['/login']);
    }
    return aprobacion;

  }
}
