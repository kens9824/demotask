import { Component,  OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';


// Import the AuthService type from the SDK

@Component({
  selector: 'reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss'],
})
export class RewardComponent implements OnInit {
  name: string = '';
  baseUrl = environment.baseUrl;
  lists: any = [];
  id;
  constructor(private route: ActivatedRoute,private router: Router,private http: HttpClient) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
    this.http.get(this.baseUrl + 'reward/' + this.id).subscribe((data:any) => {
      this.lists = data;
    })
    }
  }
  ngOnInit(): void {}

}
