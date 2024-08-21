import { Component,  OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


// Import the AuthService type from the SDK

@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  name: string = '';
  id;
  constructor(private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder,) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
    console.log(this.id);
    }
    
  }
  ngOnInit(): void {}
  Save(){
    console.log("Save",this.name);

    this.router.navigateByUrl('/');
    
  }
  Cancel(){
    this.router.navigateByUrl('/');
    
  }
  goTop5(){
    this.router.navigateByUrl('/123/p5');
    
  }
  goTorewards(){
    this.router.navigateByUrl('/123/rewards');
    
  }
}
