import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-clear',
  templateUrl: './btn-clear.component.html',
  styleUrls: ['./btn-clear.component.css']
})
export class BtnClearComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  navegarInicio(){
this.router.navigate(['start']);
  }
}
