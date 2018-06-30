import { Injectable } from '@angular/core';
import { Turno } from '../../clases/turno';
import { MiHttpService } from '../http/mi-http.service';


@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor( private miTurno: Turno, private miHttp: MiHttpService) { }

  getIdTurno(){
    return this.miTurno.id;
  }
  setIdTurno(id){
    this.miTurno.id = id;
  }

  getIdMascota(){
    return this.miTurno.id_mascota;
  }
  setIdMascota(idMas){
    this.miTurno.id_mascota = idMas;
  }

  getFechaTurno(){
    return this.miTurno.fecha;
  }
  setFechaTurno(fecha){
    this.miTurno.fecha = fecha;
  }

  getEstadoTurno(){
    return this.miTurno.estado;
  }
  setEstadoTurno(estado){
    this.miTurno.estado = estado;
  }

  getDescripcionTurno(){
    return this.miTurno.descripcion;
  }
  setDescripcionTurno(desc){
    this.miTurno.descripcion = desc;
  }

  agregarTurno(data): Promise<any>{
    return this.miHttp.httpPostP('agregarTurno', data)
    .then(data => {
      console.log(data);
      return data;
    })
  }
  traerMisTurnos(data): Promise<any>{
    return this.miHttp.httpPostP('traerMisTurnos', data)
    .then(data => {
      console.log(data);
      return data;
    })
  }
  traerTodosLosTurnos(): Promise<any>{
    return this.miHttp.httpGetP('traerTodosLosTurnos')
    .then(data => {
      console.log(data);
      return data;
    })
  }
  actualizarTurno(data): Promise<any>{
    return this.miHttp.httpPostP('actualizarTurno', data)
    .then(data => {
      console.log(data);
      return data;
    })
  }
}
