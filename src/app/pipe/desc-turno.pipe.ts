import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descTurno'
})
export class DescTurnoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value == '1') {
      return "Activo";
    } else if (value == '2') {
      return "Realizado";
    } else if (value == '3') {
      return "Cancelado por el usuario";
    } else if (value == '0') {
      return "Cancelado por administrador";
    }
    else {
      return value;
    }
  }

}
