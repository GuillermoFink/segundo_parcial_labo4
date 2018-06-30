import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoUsuario'
})
export class TipoUsuarioPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value==10){
      return "Admin";
    }else if (value == 20){
      return "Usuario/Cliente";
    }else{
      return value;
    }
  }

}
