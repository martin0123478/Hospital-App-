import { Component, OnInit } from '@angular/core';
import { Observable,interval } from 'rxjs';
import {retry,take,map,filter} from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { 
    
    
  //   this.retornaObservale().pipe(
  //     retry(1)
  //   )
  //   .subscribe(
  //     valor =>console.log('Subs', valor),
  //     (error:any) => console.log('Error', error),
  //     () => console.info('Obs terminado')
  //   )
  this.retornaIntervalo().subscribe(
     console.log
  )
   }

  retornaIntervalo(){
    const intervalo$ = interval(500).pipe(
      
      map(valor =>valor +1 ),
      filter(valor => (valor % 2 ===0)? true:false),
      take(10),
    )
    return intervalo$
  }

  retornaObservale():Observable<number>{
    let i =0;
    const obs$ = new Observable<number>(observer =>{
      
   const intervalo =   setInterval(() =>{
        i++;
        observer.next(i)

    if(i ===4){
      clearInterval(intervalo);
      observer.complete()
    }
    if(i===2){
      i=0;
      observer.error('i llego al valor de 2')
    }
   },1000)
    });


    return obs$
  }
  ngOnInit(): void {
  }

}
