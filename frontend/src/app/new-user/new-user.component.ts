import { Component,  OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';


// Import the AuthService type from the SDK

@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  name: string = '';
  baseUrl = environment.baseUrl;
  id;
  
  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
    this.http.get(this.baseUrl + 'user/' + this.id).subscribe((data:any) => {
      this.name = data.name
    })
    }
    
  }
  ngOnInit(): void {}
  Save(){
    var data:any = {
      name : this.name
    }
    if(this.id) {
      data['id'] = this.id;

      this.http.patch(this.baseUrl + 'user',data).subscribe((data:any) => {
        this.router.navigateByUrl('/');
      })
    }
    else{
      this.http.post(this.baseUrl + 'user',data).subscribe((data:any) => {
        this.router.navigateByUrl('/');
      })
    }    
  }
  Cancel(){
    this.router.navigateByUrl('/');
    
  }
  goTop5(){
    this.router.navigateByUrl('/'+ this.id + '/p5');
    
  }
  goTorewards(){
    this.router.navigateByUrl('/'+ this.id + '/rewards');
  }
}
