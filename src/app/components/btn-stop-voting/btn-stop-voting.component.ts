import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-stop-voting',
  templateUrl: './btn-stop-voting.component.html',
  styleUrls: ['./btn-stop-voting.component.css']
})
export class BtnStopVotingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  navegarFinishVoting(){
    this.router.navigate(['/resultsVoting']);
  }
}
