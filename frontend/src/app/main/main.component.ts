import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';


// Import the AuthService type from the SDK

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(private router: Router) {

  }
  ngOnInit(): void {

  }

  Login(){
    // console.log(123);
    this.router.navigateByUrl('/123');
    
  }

  newUser(){
    // console.log(123);
    this.router.navigateByUrl('/new');
    
  }
 
}
