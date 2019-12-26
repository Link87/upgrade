import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  visible = true;
  @Output() paddingUpdate = new EventEmitter<boolean>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authenticator: AuthenticationService) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
    )
    .pipe(
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data),
    )
    .subscribe(event => {
      this.setVisible(event.navbar === undefined || event.navbar); // show the navbar?
    });

  }

  setVisible(visible: boolean) {
    this.visible = visible;
    this.paddingUpdate.emit(visible);
  }

  login1() {
    this.authenticator.login('test1', '123').subscribe();
  }

  login2() {
    this.authenticator.login('test2', '123').subscribe();
  }

  logout() {
    this.authenticator.logout();
  }

}
