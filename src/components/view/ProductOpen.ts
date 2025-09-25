
import { IEvents } from "../base/events";
import { ProductGallery } from "./ProductGallery";

interface IproductOpen {
    description: string;
    isInBasket:boolean;
}
export class ProductOpen extends ProductGallery<IproductOpen>{
    protected buttonProduct: HTMLButtonElement;
    protected events:IEvents;
    protected cardText:HTMLElement;
    protected _isInBasket: boolean;


    constructor(protected container:HTMLElement, events:IEvents){
        super(container,events);
        this.events = events;
        this.buttonProduct = this.container.querySelector('.card__button');
        this.cardText = this.container.querySelector('.card__text');
            this.buttonProduct.addEventListener('click', () => {
        if (this.buttonProduct.textContent === 'Убрать из корзины') {
            this.buttonProduct.textContent = 'В корзину'
            this.events.emit('delete:product', { card: this });
        } else {
            this.events.emit('product:add', { card: this });
            this.buttonProduct.textContent = 'Убрать из корзины'
        }
    });
    }



set isInBasket(boolean: boolean) {
    this._isInBasket = boolean;
    this.buttonProduct.textContent = boolean ? 'Убрать из корзины' : 'В корзину';
}
    set description(text:string){
        this.cardText.textContent = text;
    }

    set price(price:number|null){
        if (price == null){
            this.buttonProduct.disabled = true;
            this.buttonProduct.textContent = 'Недоступно'
        }else{
            this.buttonProduct.disabled = false;
            super.price = price;
        }
    }
}