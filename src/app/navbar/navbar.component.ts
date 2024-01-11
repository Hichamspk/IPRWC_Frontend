import { Component } from '@angular/core';
import { faShoppingCart, faHome, faUser, faList, faInfoCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import {ShoppingCartService} from "../service/shopping-cart.service";

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
  faUser = faUser;
  faList = faList;
  faInfoCircle = faInfoCircle;
  faBars = faBars;
  totalQuantity: number = 0;


  constructor(private shoppingCartService: ShoppingCartService) {
    this.links = [
      { title: 'Profile', path: '/login', icon: this.faUser },
      { title: 'Products', path: '/products', icon: this.faList },
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
  ngOnInit(): void {
    this.shoppingCartService.items$.subscribe(items => {
      this.totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    });
  }
}
