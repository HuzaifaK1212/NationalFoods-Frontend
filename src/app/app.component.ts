import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'raid';
  public routerLink: boolean;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/' || val.url == '/login') {
          this.routerLink = false;
        } else {
          this.routerLink = true;
        }
      }
    });
  }
}
