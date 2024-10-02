import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  /* store user screen size */
  screenwidth = 0;
  /* flag to check user login or not */
  isShowMenu = false;

  constructor(private authservice: AuthService) {}
  
  ngOnInit(): void {
    this.screenwidth = window.innerWidth
  }

  ngAfterViewInit(): void {
    this.authservice.isUserLogin.subscribe((res)=> { this.isShowMenu = res });
  }

  /* on user logout */
  logout() {
    this.authservice.logout();
  }

}
