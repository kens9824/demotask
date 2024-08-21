import { Component,  OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


// Import the AuthService type from the SDK

@Component({
  selector: 'new-reward',
  templateUrl: './newreward.component.html',
  styleUrls: ['./newreward.component.scss'],
})
export class NewRewardComponent implements OnInit {
  points: number = 0;

  options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];
  selectedOption: string = '';
  id
  constructor(private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder,) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
    console.log(this.id);
    }
    
  }
  ngOnInit(): void {}


  Submit(){
    // console.log(123);
    // this.router.navigateByUrl('/new');
    
  }
  Cancel(){
    this.router.navigateByUrl('/');
    
  }

}
