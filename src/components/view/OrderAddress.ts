import { IEvents } from "../base/events";
import { Form } from "./Form";

export interface IOrder{
}

export class OrderAddress extends Form<IOrder>{
protected buttonCard:HTMLButtonElement;
protected buttonCash:HTMLButtonElement;
protected events:IEvents;


constructor(protected container:HTMLFormElement, events:IEvents){
    super(container,events);
    this.events = events;
        this.buttonCard = this.container.querySelector('[name="card"]');
        this.buttonCash = this.container.querySelector('[name="cash"]');
        this.buttonCard.addEventListener('click', () => {
            this.togglePaymentMethod('card');
        });
        
        this.buttonCash.addEventListener('click', () => {
            this.togglePaymentMethod('cash');
        });

        
}
 


    protected togglePaymentMethod(method: 'card'| 'cash'): void {
        // Снимаем активный класс с обеих кнопок
        this.buttonCard.classList.remove('button_alt-active');
        this.buttonCash.classList.remove('button_alt-active');
        const selectedButton = this.container.querySelector(`[name="${method}"]`);
        selectedButton.classList.add('button_alt-active');
        this.events.emit('payment:changed', { method });
    }

}