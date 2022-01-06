import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent  {

  progress:number = 50;
  get getPorcentaje(){
    return `${this.progress}%`
  }

  cambiarValor(valor:number){
    this.progress = this.progress + valor;
  }

}
