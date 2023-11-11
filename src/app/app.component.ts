import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'front';
  isLogin = false;
  ngOnInit() {
    this.router.events.pipe().subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      }
    });
    window.location.pathname === '/login'
      ? (this.isLogin = true)
      : (this.isLogin = false);
  }
}
