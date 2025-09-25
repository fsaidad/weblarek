import { createElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export interface IBasket {
    price:HTMLElement;
    products:HTMLElement[];
}

export class Basket extends Component<IBasket>{
    protected events:IEvents;
    protected productContainer:HTMLElement;
    protected basketButton:HTMLButtonElement;
    protected basketPrice:HTMLElement;

    constructor(protected container:HTMLElement, events:IEvents){
        super(container);
        this.events = events;
        this.productContainer = container.querySelector('.basket__list');
        this.basketButton = container.querySelector('.basket__button');
        this.basketPrice = container.querySelector('.basket__price');
        this.basketButton.addEventListener('click', () =>{
            events.emit('order:start')
        })
    }
    set products(productList:HTMLElement[]){
        if(productList.length){
            this.productContainer.replaceChildren(...productList);
             this.basketButton.disabled = false;
        } else {
            this.productContainer.replaceChildren(createElement('p', {textContent: 'Пока тут пусто'}))
            this.basketButton.disabled = true;
        }
    }
    set price(price:number){
        this.basketPrice.textContent = `${price} синапсов`;
    }

}