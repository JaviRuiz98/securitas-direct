import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { IColumna } from 'src/app/models/ITabla';
import { IFiltro } from 'src/app/models/IFiltro';
import { IColumnaBotones, IOpcionesDropdown } from 'src/app/models/ITabla';
import { IColumnaBotonesDatos } from 'src/app/models/IColumnaBotones';
import * as FileSaver from 'file-saver';
import { IRenovaciones } from 'src/app/models/IRenovaciones';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})

export class TablaComponent implements OnInit {

  @Input() columnas_tabla: IColumna[] = [];
  @Input() lista_parametros_tabla: any[] = [];
  @Input() lista_columna_botones: IColumnaBotones = {
    editar: false,
    enviar_correo: false,
    borrar: false
  }
  @Input() enviar_correos_caducados_manualmente: boolean = false;
  @Input() mostrarPaginador: boolean = true;
  @Input() mostrarFiltro: boolean = true;
  @Input() mostrarCabecera: boolean = false;
  @Input() importarTablaCSV: boolean = false;

  @Output() valorFiltrado: EventEmitter<IFiltro> = new EventEmitter<IFiltro>();
  @Output() rangoFecha: EventEmitter<any> = new EventEmitter<any>();
  @Output() accionEvent: EventEmitter<IColumnaBotonesDatos> = new EventEmitter<IColumnaBotonesDatos>();
  @Output() listaFilasRenovacionesSeleccionadasEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() valorDropDownRenovar: EventEmitter<any> = new EventEmitter<IRenovaciones>();

  lista_cabeceras: string[] = [];
  lista_filtros: IFiltro[] = [];
  lista_filas_seleccionadas: any[] = [];
  opcionDropdownSeleccionada: string = '';
  opcionesDropdown: IOpcionesDropdown[] = [
    {value: true, name: 'Sí'},
    {value: false, name: 'No'},
    {value: null, name: ' '},
  ];

  constructor() {};

  ngOnInit() {
    this.getColumnasFromListaParametros();
  };
  getColumnasFromListaParametros() {
    this.lista_filtros = this.columnas_tabla.map(item => ({cabecera: item.etiqueta, caracteristicas: item.clave, filtro: item.filtro}));
  }
  filtrarDatos(event: IFiltro): void {
    this.valorFiltrado.emit(event);
  }
  rangoFechas(event: any) {
    this.rangoFecha.emit(event);
  }

  accionListaBotones(event: IColumnaBotonesDatos) {
    this.accionEvent.emit(event);
  }

  fecha(fecha: any): boolean {
    return fecha instanceof Date;
  }
  string(string: any): boolean{
    return typeof string === 'string';
  }
  fechaNull(fecha: any): boolean{
    return fecha == null;
  }
  columnaBotones(string: any): boolean{
    return string === 'Acciones';
  }
  toggleSelection(product: any) {
    product.isSelected = !product.isSelected;
  }
  onSelectionChange(event: any) {
    this.lista_filas_seleccionadas = event;
    this.listaFilasRenovacionesSeleccionadasEvent.emit(this.lista_filas_seleccionadas);
  }
  exportExcel() {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.lista_parametros_tabla);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'products');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, 'Resumen_tabla' + EXCEL_EXTENSION);
  }
  onDropdownChange(rowData: IRenovaciones) {
    this.valorDropDownRenovar.emit(rowData);
  }
}
