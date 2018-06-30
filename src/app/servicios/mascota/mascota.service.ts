import { Injectable } from '@angular/core';
import { Mascota } from '../../clases/mascota';
import { MiHttpService } from '../http/mi-http.service';
import { promise } from 'protractor';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private miHttp: MiHttpService, private miMascota: Mascota) { }

  //
  getIdMascota() {
    return this.miMascota.id;
  }
  setIdMascota(data) {
    this.miMascota.id = data;
  }

  getIdUsuarioMascota() {
    return this.miMascota.id_usuario;
  }
  setIdUsuarioMascota(data) {
    this.miMascota.id_usuario = data;
  }

  getRaza() {
    return this.miMascota.raza;
  }
  setRaza(data) {
    this.miMascota.raza = data;
  }

  getColor() {
    return this.miMascota.color;
  }
  setColor(data) {
    this.miMascota.color = data;
  }

  getEdad() {
    return this.miMascota.edad;
  }
  setEdad(data) {
    this.miMascota.edad = data;
  }

  getTipo() {
    return this.miMascota.tipo;
  }
  setTipo(data) {
    this.miMascota.tipo = data;
  }

  traerTodasLasMascotas(): Promise<any>{
    return this.miHttp.httpGetP('traerTodasLasMascotas')
    .then (data => {
      console.log(data);
      return data;
    })
  }
  agregarMascota(data): Promise<any> {
    return this.miHttp.httpPostP('agregarMascota', data)
    .then (data => {
      console.log(data);
      return data;
    })
  }
  traerMascotasPorDuenio(data): Promise<any> {
    return this.miHttp.httpPostP('traerMascotasPorDuenio', data)
    .then (data => {
      console.log(data);
      return data;
    })
  }
  traerMascotaPorId(data): Promise<any> {
    return this.miHttp.httpPostP('traerMascotaPorId', data)
    .then (data => {
      console.log(data);
      return data;
    })
  }
  modificarMascota(data): Promise<any> {
    return this.miHttp.httpPostP('modificarMascota', data)
    .then (data => {
      //console.log(data);
      return data;
    })
  }
}
