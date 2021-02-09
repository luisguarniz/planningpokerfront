import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cabecera-invited',
  templateUrl: './cabecera-invited.component.html',
  styleUrls: ['./cabecera-invited.component.css']
})
export class CabeceraInvitedComponent implements OnInit {
  Room;
  constructor( public dataservice: DataService) { 
  }

  ngOnInit(): void {
  }
}
