import { Component, Input, OnInit } from '@angular/core';

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
  

  cambiarValor(valor:number){
    this.progress = this.progress + valor;
  }

}
