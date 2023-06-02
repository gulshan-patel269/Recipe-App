import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub:Subscription

  constructor(private dataStorageService:DataStorageService, 
    private authSevice:AuthService){}

  ngOnInit(): void {
   this.userSub = this.authSevice.user.subscribe(user=>{
    this.isAuthenticated = !!user;
    console.log(!user);
    console.log(!!user);
   })
  }

  onSaveRecipe(){
    this.dataStorageService.storeRecipes();
  }
  onFetchRecipe(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(){
    this.authSevice.logout()
  }

 
}
