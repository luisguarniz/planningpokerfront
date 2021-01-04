import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css']
})
export class CartasComponent implements OnInit {

  estaCheckeado = true;
  cardValue;

  constructor(private router:Router) { }


  ngOnInit(): void {

  }

  alternarClass(event){
 
    event.target.classList.toggle('colorAzul');
    console.log(event.target.id);
  }
  navegarStopVoting(){
    this.router.navigate(["/hostVoting"]);
  }
  presionar(){
    console.log(this.cardValue);
  }
}
