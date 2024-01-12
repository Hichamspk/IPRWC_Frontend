import { environment } from "../environment/environment";
import { Injectable } from "@angular/core";
import{ ApiResponse} from "../model/api-response.model";
import { CartItem } from "../model/CartItem";
import { User } from "../model/profile-page.model";
import { HttpClient } from "@angular/common/http";
import { ShopOrder } from "../model/shop-order.model";
import { OrderItem } from "../model/order-item.model";
import {ProfilePageService} from "./profile-page.service";
import {ShoppingCartService} from "./shopping-cart.service";



@Injectable({
    providedIn: 'root'
})
export class ShopOrderService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private profilePageService: ProfilePageService,
                private httpClient: HttpClient,
                private shoppingCartService: ShoppingCartService) {
    }

    placeOrder(total: number, cartItems: CartItem[]) {
        this.profilePageService.getUserById().subscribe(response => {
            const user: User = response;
            const orderData = {
                user: user,
                totalAmount: total
            };

            this.httpClient.post<ApiResponse<ShopOrder>>(this.apiServerUrl + "/orders/new-order", orderData, {withCredentials: true}).subscribe(response => {
                const order = response.payload;
                if (order && order.id) {
                    for (const cartItem of cartItems) {
                        this.placeNewOrderItem(order.id, cartItem.product.id, cartItem.quantity, cartItem.product.price * cartItem.quantity).subscribe(
                            itemResponse => {
                                console.log(itemResponse);
                            }
                        );
                    }
                    // Clear the cart and show a success message after placing the order
                    this.shoppingCartService.clearCart();
                    alert("Order has been successfully placed!"); // Or use a more sophisticated notification mechanism
                }
            });
        });
    }

    placeNewOrderItem(shopOrderId: number, productId: number, quantity: number, subtotal: number) {
        const orderItemData = {
            shopOrder: {id: shopOrderId},
            productId: productId,
            quantity: quantity,
            subTotal: subtotal,
        };

        const httpOptions = {
            withCredentials: true
        };

        return this.httpClient.post<OrderItem>(
            this.apiServerUrl + "/order-items/new-order-item",
            orderItemData,
            httpOptions
        );
    }
}
