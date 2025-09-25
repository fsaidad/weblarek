import { IProduct } from "../../types";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export class Product<T> extends Component<IProduct> {
    protected events: IEvents;
    protected productPrice:HTMLElement;
    protected productTitle:HTMLElement;
    constructor(protected container:HTMLElement, events:IEvents){
        super(container)
this.events = events;
this.productPrice = this.container.querySelector('.card__price');
this.productTitle = this.container.querySelector('.card__title');

}

set price(price:number){
    if (price == null){
        this.productPrice.textContent = 'Бесценно';
    } else
    this.productPrice.textContent = `${price} синапсов`;
}
set title(title:string){
    this.productTitle.textContent = title;
}
}



