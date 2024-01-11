import {environment} from "../environment/environment";
import {Injectable} from "@angular/core";
import {ProfilePageService} from "./profile-page.service";
import {CartItem} from "../model/CartItem";
import {User} from "../model/profile-page.model";
import {HttpClient} from "@angular/common/http";
import {ShopOrder} from "../model/shop-order.model";
import {OrderItem} from "../model/order-item.model";

export interface ApiResponse<T> {
    code: string;
    payload: T;
    message: string;
}


@Injectable({
    providedIn: 'root'
})
export class ShopOrderService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private profilePageService: ProfilePageService, private httpClient: HttpClient) {
    }

    placeOrder(total:number, cartItems: CartItem []){
        let user!: User;
        this.profilePageService.getUserById().subscribe(
            response =>{
                user = response;
                const orderData = {
                    user: user,
                    totalAmount: total
                }
                return this.httpClient.post<ApiResponse<ShopOrder>>(this.apiServerUrl + "/orders/new-order", orderData).subscribe(response  =>{
                    let order = response.payload;
                    if (order) for (var cartItem of cartItems) this.placeNewOrderItem(order, cartItem.product.id, cartItem.quantity, cartItem.product.price * cartItem.quantity).subscribe(
                        response =>{
                            console.log(response)
                        }
                    )

                })
            }
        )

    }
    placeNewOrderItem(shopOrderId: ShopOrder, productId: number, quantity: number, subtotal: number){
        return this.httpClient.post<OrderItem>(this.apiServerUrl + "/order-items/new-order-item", {
            shopOrder: shopOrderId,
            productId: productId,
            quantity: quantity,
            subTotal: subtotal,
        })
    }
}
