import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NewUserComponent } from './new-user/new-user.component';
import { P5Component } from './p5/p5.component';
import { RewardComponent } from './reward/reward.component';
import { NewRewardComponent } from './newreward/newreward.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewUserComponent,
    P5Component,
    RewardComponent,
    NewRewardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
