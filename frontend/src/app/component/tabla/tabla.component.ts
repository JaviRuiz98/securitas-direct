import { Component, OnInit } from '@angular/core';
import { Columna } from 'src/app/interfaces/tabla';
import { Parametros } from 'src/app/interfaces/tabla';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit{

  @Input() parametros: Parametros[] = [];
  @Input() columnas: Columna[] = [];
  @Input() boton_buscar_fecha_hora: boolean = false;

  @Output() dateTimeSelected = new EventEmitter<string>();

  selectedDateTime: string = '';

  constructor() {}

  ngOnInit(): void {}

  sendDateTime() {
    this.dateTimeSelected.emit(this.selectedDateTime);
  }
}
