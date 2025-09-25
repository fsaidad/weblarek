import { IEvents } from "../base/events";
import { Component } from "./Component";
export interface ISuccess{
    total:Number;
}
export class Success extends Component<ISuccess>{
    protected events:IEvents;
    protected buttonSuccess:HTMLButtonElement;
    protected totalSuccess:HTMLElement;
    constructor(protected container:HTMLElement, events:IEvents){
        super(container);
        this.events = events;
        this.buttonSuccess = container.querySelector('.order-success__close');
        this.totalSuccess = container.querySelector('.order-success__description'); 
        this.buttonSuccess.addEventListener('click', ()=>{
            this.events.emit('success:complete');
        })
    }
    set total(total:Number){
        this.totalSuccess.textContent = `${total} синапсов`
    }
}