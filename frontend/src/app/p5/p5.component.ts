import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';


// Import the AuthService type from the SDK

@Component({
  selector: 'p5',
  templateUrl: './p5.component.html',
  styleUrls: ['./p5.component.scss'],
})
export class P5Component implements OnInit {
  name: string = '';
  baseUrl = environment.baseUrl;
  lists: any = [];
  id;
  
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.http.get(this.baseUrl + 'reward/' + this.id + '/p5').subscribe((data: any) => {
        this.lists = data;
      })

    }
  }
  ngOnInit(): void { }

  newReward() {
    this.router.navigateByUrl('/' + this.id + '/rewards/new');
  }
  onDelete(id: number) {
    this.http.delete(this.baseUrl + 'reward/' + id).subscribe((data: any) => {
      this.router.navigateByUrl('/');
    })
  }
}
