import {ShopOrder} from "./shop-order.model";

export class OrderItem{
    private _id?: number;
    private _shopOrder: ShopOrder;
    private _productId: number;
    private _quantity: number;
    private _subtotal: number;


    constructor(shopOrder: ShopOrder, productId: number, quantity: number, subtotal: number, id?: number) {
        this._id = id;
        this._shopOrder = shopOrder;
        this._productId = productId;
        this._quantity = quantity;
        this._subtotal = subtotal;
    }


    get id(): number | undefined {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get shopOrder(): ShopOrder {
        return this._shopOrder;
    }

    set shopOrder(value: ShopOrder) {
        this._shopOrder = value;
    }

    get productId(): number {
        return this._productId;
    }

    set productId(value: number) {
        this._productId = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }

    get subtotal(): number {
        return this._subtotal;
    }

    set subtotal(value: number) {
        this._subtotal = value;
    }
}
