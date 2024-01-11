import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../service/shopping-cart.service";
import { Location } from '@angular/common';
import {Route, Router} from "@angular/router";
import {ProfilePageService} from "../service/profile-page.service";
import {CartItem} from "../model/CartItem";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: ShoppingCartService,
              private location: Location,
              private router: Router,
              private profilePageService: ProfilePageService
  ) {}

  ngOnInit(): void {
    this.cartService.items$.subscribe(
      (items) => {
        this.cartItems = items;
        this.totalPrice = this.cartService.getTotalPrice();
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  goBack(): void {
    this.location.back();
  }

  updateItemQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

}
