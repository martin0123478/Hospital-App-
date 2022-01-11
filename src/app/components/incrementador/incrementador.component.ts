import { Component, OnInit } from '@angular/core';

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

  progress:number = 50;
  get getPorcentaje(){
    return `${this.progress}%`
  }

  cambiarValor(valor:number){
    this.progress = this.progress + valor;
  }

}
