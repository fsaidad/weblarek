import { IProduct } from "../../types";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export class Core extends Component<ICore> {
    protected events:IEvents;
    protected buttonBasket:HTMLButtonElement;
    protected gallery:HTMLElement;
    protected count:HTMLElement;
    constructor(protected container:HTMLElement, events:IEvents){
        super(container)
        this.events = events;
        this.buttonBasket = this.container.querySelector('.header__basket');
        this.gallery = this.container.querySelector('.gallery');
        this.count = this.container.querySelector('.header__basket-counter');
        
        this.buttonBasket.addEventListener('click', () => {
            this.events.emit('basket:open');
            this.events.emit('basketChanged');
        }
        )
    }


    set counter(value: number){
        
        this.count.textContent = `${value}`;
    }

    set coreGallery(items:HTMLElement[]){
        this.gallery.replaceChildren(...items)
    }

set lock(isLocked: boolean) {

    
    if (isLocked) {
        this.container.classList.add('page__wrapper_locked');
    } else {
        this.container.classList.remove('page__wrapper_locked');
    }
}
    
} 

export interface ICore{
    counter: number;
    coreGallery: HTMLElement[];
    lock:boolean;
} 