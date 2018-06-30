import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehiculo'
})
export class VehiculoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == 1000){
      return "Auto";
    }else if(value == 2000){
      return "Moto";
    }else if(value == 3000){
      return "Camioneta";
    }else if(value < 1000 ){
      return "Nuevo";
    }else if( value > 1000 && value < 5000 && value != 3000){
      return "En ablande";
    }else if( value > 5000){
      return "Usado";
    }
    else{
      return value;
    }
  }

}
