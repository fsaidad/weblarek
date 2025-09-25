import { IEvents } from "../base/events";
import { Component } from "./Component";
import { Modal } from "./Modal";
import { Product } from "./Product";

export interface ICardBasket {
    index:HTMLElement;
    product:HTMLElement;
}
export class CardBasket extends Product<ICardBasket>{
protected basketIndex:HTMLElement;
protected events:IEvents;
protected buttonDel:HTMLButtonElement;

constructor(protected container:HTMLElement, events:IEvents){
    super(container,events);
    this.events = events;
    this.basketIndex = container.querySelector('.basket__item-index');
    this.buttonDel = container.querySelector('.basket__item-delete');
    this.buttonDel.addEventListener('click', ()=> {
        this.events.emit('delete:product',{card:this})
    })
}

set index(index:number){
    this.basketIndex.textContent = `${index}`;
}

}