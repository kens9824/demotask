import { Component,  OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


// Import the AuthService type from the SDK

@Component({
  selector: 'p5',
  templateUrl: './p5.component.html',
  styleUrls: ['./p5.component.scss'],
})
export class P5Component implements OnInit {
  name: string = '';
  id;
  constructor(private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder,) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
    console.log(this.id);
    }
    
  }
  ngOnInit(): void {}
  Login(){
    this.router.navigateByUrl('/123');
    
  }

  newReward(){
    // console.log(123);
    this.router.navigateByUrl('/123/rewards/new');
    
  }
}
