import { Component,  OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


// Import the AuthService type from the SDK

@Component({
  selector: 'reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss'],
})
export class RewardComponent implements OnInit {
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
    // console.log(123);
    this.router.navigateByUrl('/123');
    
  }

}
