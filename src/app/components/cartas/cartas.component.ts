import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { UnblockVotingService } from 'src/app/services/unblock-voting.service';


@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css']
})
export class CartasComponent implements OnInit {

@ViewChildren ("idDiv") idDiv : QueryList<any>;//se le puso <Any> por que estaba con <ngmodel> y no se podia usar .nativeElement en el foreach
  estaCheckeado = true;
  cardValue;

 msgUnblock = false;
 
  constructor(private router:Router, private elemento:ElementRef, private render: Renderer2, private unblockvoting : UnblockVotingService) { }

  ngOnInit(): void {

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

  onblock(){

    this.unblockvoting.unblockCarts(this.msgUnblock)
    .subscribe( resp =>{
      console.log(resp);
    })  
  }
}
