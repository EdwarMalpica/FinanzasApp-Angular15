import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  api = 'http://mongoproject.alwaysdata.net/';

  constructor(private http: HttpClient) {}

  obtenerDatos() {
    return this.http.get(this.api+'history');
  }

  delete(id:string){
    this.http.delete(this.api+'delete/'+id).subscribe( ()=>{
      console.log('Eliminado exitosamente');
    }, error=>{
      console.error(error);
    });
  }

  agregar(type:string,descripcion:string, value:number){
    const data = {
      type: type,
      total: value,
      update_description:descripcion
    };

    this.http.post(this.api+'finance',data).subscribe( ()=>{
      console.log('Inserccion exitosa');

    },error=>{
      console.error(error);

    })

  }

}
