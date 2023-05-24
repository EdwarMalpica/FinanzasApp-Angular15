import { BehaviorSubject, map } from "rxjs";
import { Egreso } from "./egreso.model";
import { ApiServiceService } from "../Services/api-service.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class EgresoServicio {
  constructor(private _api: ApiServiceService) {
    this.loadData();
  }

  loadData() {
    this._api.obtenerDatos().subscribe((data: any) => {
      data.map((i: any) => {
        console.log(i);
        if (i.type == 'outcome') {
          this.egresos.push(
            new Egreso(i._id.$oid, i.update_description, i.total)
          );
        }
      });
    });
  }

  egresos: Egreso[] = [];

  private egreso: BehaviorSubject<Egreso> = new BehaviorSubject<Egreso>(null);

  agregar(egreso: Egreso) {
    this._api.agregar('outcome', egreso.descripcion, egreso.valor);
  }

  eliminar(egreso: Egreso) {
    const indice: number = this.egresos.indexOf(egreso);
    this.egresos.splice(indice, 1);
    this._api.delete(egreso.id);
    return indice;
  }
  editar(egreso: Egreso) {
    this.egreso.next(egreso);
  }
  getEgreso() {
    return this.egreso.asObservable();
  }
  editarPush(egreso: Egreso, indice: number) {
    this.egreso[indice] = egreso;
  }
}
