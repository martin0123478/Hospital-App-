import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

 @Input() progress:number = 50;
  @Output() valorSalida:EventEmitter<number> = new EventEmitter();

  cambiarValor(valor:number){
    // this.valorSalida.emit(100)
    this.progress = this.progress + valor;
    this.valorSalida.emit(this.progress)
  }

}
