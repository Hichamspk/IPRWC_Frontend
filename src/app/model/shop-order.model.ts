import {User} from "./profile-page.model";
export class ShopOrder {
    private _id?: number;
    private _userId: User;
    private _orderStatus?: string;
    private _orderDate?: Date;
    private _totalAmount: number;


    constructor(userId: User, totalAmount: number, orderDate?: Date, id?: number, orderStatus?: string) {
        this._id = id;
        this._userId = userId;
        this._orderStatus = orderStatus;
        this._orderDate = orderDate;
        this._totalAmount = totalAmount;
    }


    get id(): number | undefined{
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get userId(): User {
        return this._userId;
    }

    set userId(value: User) {
        this._userId = value;
    }

    get orderStatus(): string | undefined{
        return this._orderStatus;
    }

    set orderStatus(value: string) {
        this._orderStatus = value;
    }

    get orderDate(): Date | undefined{
        return this._orderDate;
    }
    set orderDate(value: Date) {
        this._orderDate = value;
    }

    get totalAmount(): number {
        return this._totalAmount;
    }

    set totalAmount(value: number) {
        this._totalAmount = value;
    }
}
