import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-start-feedback',
  templateUrl: './btn-start-feedback.component.html',
  styleUrls: ['./btn-start-feedback.component.css']
})
export class BtnStartFeedbackComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  navegarStopVoting(){
    this.router.navigate(["/hostVoting"]);
  }
}
