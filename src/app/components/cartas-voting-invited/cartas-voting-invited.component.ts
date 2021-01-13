import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartas-voting-invited',
  templateUrl: './cartas-voting-invited.component.html',
  styleUrls: ['./cartas-voting-invited.component.css']
})
export class CartasVotingInvitedComponent implements OnInit {

  @ViewChildren ("idDiv") idDiv : QueryList<any>;//se le puso <Any> por que estaba con <ngmodel> y no se podia usar .nativeElement en el foreach
 
  
  msgUnblock;
  estaCheckeado = true;
  cardValue;

 botonImprimir = false;
 
  constructor(private router:Router, private elemento:ElementRef, private render: Renderer2) { }

  ngOnInit(): void {

    this.botonImprimir= this.msgUnblock;
  }

  alternarClass(event,id){
    this.idDiv.forEach(element => { 
      this.render.removeClass(element.nativeElement, "colorAzul");
      console.log(element);
    });
    event.target.classList.toggle('colorAzul');
    console.log(id.value);
  }
  presionar(){
    console.log(this.cardValue);
  }

}
