import { Injectable } from '@angular/core';
import { Vehiculo } from '../../clases/vehiculo';
import { MiHttpService } from '../http/mi-http.service';
import { promise } from 'protractor';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(private miHttp: MiHttpService, private miVehiculo: Vehiculo) { }

  getIdVehiculo(){
    return this.miVehiculo.id;
  }
  setIdVehiculo(data){
    this.miVehiculo.id = data;
  }

  getIdUsuarioVehiculo(){
    return this.miVehiculo.id_usuario;
  }
  setIdUsuarioVehiculo(data){
    this.miVehiculo.id_usuario = data;
  }
  getPatente(){
    return this.miVehiculo.patente;
  }
  setPatente(data){
    this.miVehiculo.patente = data;
  }
  getColor(){
    return this.miVehiculo.color;
  }
  setColor(data){
    this.miVehiculo.color = data;
  }
  getKilometros(){
    return this.miVehiculo.kilometros;
  }
  setKilometros(data){
    this.miVehiculo.kilometros = data;
  }
  getMarca(){
    return this.miVehiculo.marca;
  }
  setMarca(data){
    this.miVehiculo.marca = data;
  }
  getTipo(){
    return this.miVehiculo.tipo;
  }
  setTipo(data){
    this.miVehiculo.tipo = data;
  }

  traerTodosLosVehiculos(): Promise<any>{
    return this.miHttp.httpGetP('traerTodosLosVehiculos')
    .then (data => {
      console.log(data);
      return data;
    })
  }

  agregarVehiculo(data): Promise<any> {
    return this.miHttp.httpPostP('agregarVehiculo', data)
    .then (data => {
      console.log(data);
      return data;
    })
  }

  traerVehiculosPorDuenio(data): Promise<any> {
    return this.miHttp.httpPostP('traerVehiculoPorDuenio', data)
    .then (data => {
      console.log(data);
      return data;
    })
  }

  traerVehiculoPorId(data): Promise<any> {
    return this.miHttp.httpPostP('traerVehiculoPorId', data)
    .then (data => {
      console.log(data);
      return data;
    })
  }

  modificarVehiculo(data): Promise<any> {
    return this.miHttp.httpPostP('modificarVehiculo', data)
    .then (data => {
      //console.log(data);
      return data;
    })
  }
}
