import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NewUserComponent } from './new-user/new-user.component'
import { P5Component } from './p5/p5.component';
import { RewardComponent } from './reward/reward.component';
import { NewRewardComponent } from './newreward/newreward.component';

// Import the authentication guard

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'new',
    component: NewUserComponent
  },
  {
    path: ':id',
    component: NewUserComponent
  },
  {
    path: ':id/p5',
    component: P5Component
  },
  {
    path: ':id/rewards',
    component: RewardComponent
  },
  {
    path: ':id/rewards/new',
    component: NewRewardComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
