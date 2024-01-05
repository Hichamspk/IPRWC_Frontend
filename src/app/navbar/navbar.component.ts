import { Component } from '@angular/core';
import { faShoppingCart, faHome, faSignInAlt, faList, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  links: { title: string; path: string; icon: any }[];
  isResponsive = false;
  menuOpen = false;
  faShoppingCart = faShoppingCart;
  faHome = faHome;
  faSignInAlt = faSignInAlt;
  faList = faList;
  faInfoCircle = faInfoCircle;
  faBars = faBars;

  constructor() {
    this.links = [
      { title: 'Home', path: '/home', icon: this.faHome },
      { title: 'Login', path: '/login', icon: this.faSignInAlt },
      { title: 'Category.ts', path: '/category', icon: this.faList },
      { title: 'About', path: '/about', icon: this.faInfoCircle }
    ];

    this.updateResponsiveState();
    window.addEventListener('resize', this.updateResponsiveState.bind(this));
  }

  updateResponsiveState() {
    this.isResponsive = window.innerWidth < 1024; // Tailwind's 'lg' breakpoint
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
