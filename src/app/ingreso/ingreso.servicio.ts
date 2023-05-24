import { BehaviorSubject } from "rxjs";
import { Ingreso } from "./ingreso.model";
import { Injectable } from "@angular/core";
import { ApiServiceService } from "../Services/api-service.service";

@Injectable({
  providedIn: 'root',
})
export class IngresoServicio {
  constructor(private _api: ApiServiceService) {
    this.loadData();
  }
  loadData() {
    this._api.obtenerDatos().subscribe((data: any) => {
      data.map((i: any) => {
        console.log(i);
        if (i.type == 'income') {
          this.ingresos.push(new Ingreso(i._id.$oid,i.update_description, i.total));
        }
      });
    });
  }

  private ingreso: BehaviorSubject<Ingreso> = new BehaviorSubject<Ingreso>(
    null
  );

  ingresos: Ingreso[] = [];

  agregar(ingreso:Ingreso){
    this._api.agregar('income',ingreso.descripcion,ingreso.valor);
  }

  eliminar(ingreso: Ingreso) {
    const indice: number = this.ingresos.indexOf(ingreso);
    this.ingresos.splice(indice, 1);
    this._api.delete(ingreso.id);
  }
  editar(ingreso: Ingreso) {
    this.ingreso.next(ingreso);
  }
  getEgreso() {
    return this.ingreso.asObservable();
  }

  editarPush(ingreso: Ingreso) {
    const indice: number = this.ingresos.indexOf(ingreso);
    this.ingresos[indice] = ingreso;
  }
}
