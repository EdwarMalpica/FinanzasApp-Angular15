import { Component, OnInit } from '@angular/core';
import { IngresoServicio } from '../ingreso/ingreso.servicio';
import { EgresoServicio } from '../egreso/egreso.servicio';
import { Ingreso } from '../ingreso/ingreso.model';
import { Egreso } from '../egreso/egreso.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  tipo: string = 'ingresoOperacion';
  descripcionInput: string;
  valorInput: number;
  valorSelect:string;
  edit:boolean;


  constructor(
    private ingresoServicio: IngresoServicio,
    private egresoServicio: EgresoServicio
  ) {}
  ngOnInit(): void {
    this.egresoServicio.getEgreso().subscribe((egr) => {
      if (egr != null) {
        this.descripcionInput = egr.descripcion;
        this.valorInput = egr.valor;
        this.valorSelect = 'egresoOperacion';
        this.tipo = 'egresoOperacion';
        this.edit = true;
      }
    });
  }

  tipoOperacion(evento) {
    this.tipo = evento.target.value;
  }


  agregarValor() {
      if (this.tipo === 'ingresoOperacion') {
        this.ingresoServicio.agregar(new Ingreso('',this.descripcionInput,this.valorInput));
      } else {
        this.egresoServicio.agregar(
          new Egreso('', this.descripcionInput, this.valorInput)
        );
      }
      window.location.reload();
    }
}
