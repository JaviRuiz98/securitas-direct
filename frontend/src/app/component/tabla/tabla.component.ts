import { Component, OnInit } from '@angular/core';
import { Columna } from 'src/app/interfaces/tabla';
import { Parametros } from 'src/app/interfaces/tabla';
import { Input } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit{

  @Input() parametros: Parametros[] = [];
  @Input() columnas: Columna[] = [];

  constructor() {}

  ngOnInit(): void {}

  enviar(){
    
  }
}
