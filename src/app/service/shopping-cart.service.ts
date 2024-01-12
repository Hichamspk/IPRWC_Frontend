import { Injectable } from '@angular/core';
import { CartItem } from "../model/CartItem";
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private itemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.loadCartItems());
  public items$: Observable<CartItem[]> = this.itemsSubject.asObservable();


  private loadCartItems(): CartItem[] {
    const itemsJSON = localStorage.getItem('cartItems');
    return itemsJSON ? JSON.parse(itemsJSON) : [];
  }

  private saveCartItems(items: CartItem[]): void {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  addToCart(product: ProductModel): void {
    const items = this.loadCartItems();
    const existingItem = items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.push({ product, quantity: 1 });
    }
    this.itemsSubject.next(items);
    this.saveCartItems(items);
  }

  removeFromCart(productId: number): void {
    let items = this.loadCartItems();
    items = items.filter(item => item.product.id !== productId);
    this.itemsSubject.next(items);
    this.saveCartItems(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    const items = this.loadCartItems();
    const item = items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    this.itemsSubject.next(items);
    this.saveCartItems(items);
  }

  getTotalPrice(): number {
    const items = this.loadCartItems();
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
    localStorage.removeItem('cartItems');
  }
}
