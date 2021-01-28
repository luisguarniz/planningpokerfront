import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cartas-resultado',
  templateUrl: './cartas-resultado.component.html',
  styleUrls: ['./cartas-resultado.component.css']
})
export class CartasResultadoComponent implements OnInit {
ListaVotos;
  constructor(
    private dataservice : DataService
  ) 
  {
    this.ListaVotos = this.dataservice.VoteList;
   }

  ngOnInit(): void {
  }

}
