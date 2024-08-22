import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';




// Import the AuthService type from the SDK

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  baseUrl = environment.baseUrl;
  lists: any = [];

  constructor(private router: Router,private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get(this.baseUrl + 'reward').subscribe((data:any) => {
      this.lists = data;
    })
  }

  Login(id:string){
    this.router.navigateByUrl('/' + id);
    
  }

  newUser(){
    this.router.navigateByUrl('/new');
  }
 
}
