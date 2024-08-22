import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';


// Import the AuthService type from the SDK

@Component({
  selector: 'new-reward',
  templateUrl: './newreward.component.html',
  styleUrls: ['./newreward.component.scss'],
})
export class NewRewardComponent implements OnInit {
  points: number = 0;
  baseUrl = environment.baseUrl;
  lists: any = [];
  selectedOption: string = '';
  id

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.http.get(this.baseUrl + 'user/self/' + this.id).subscribe((data: any) => {
        this.lists = data;
      })
    }

  }
  ngOnInit(): void { }


  Submit() {
    var data = {
      points: Number(this.points),
      givenby: Number(this.id),
      givento: Number(this.selectedOption)
    }

    this.http.post(this.baseUrl + 'reward', data).subscribe((data: any) => {
      this.router.navigateByUrl('/');
    })
  }
  
  Cancel() {
    this.router.navigateByUrl('/');
  }

}
