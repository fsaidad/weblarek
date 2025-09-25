import { IEvents } from "../base/events";
import { Form } from "./Form";

interface IOrder{
    payment:string;
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
            this.onInputChange('payment' as keyof IOrder, 'card')
        });
        
        this.buttonCash.addEventListener('click', () => {
            this.onInputChange('payment' as keyof IOrder, 'cash')
        });

}

    set payment(value: string) {
        this.buttonCard.classList.remove('button_alt-active');
        this.buttonCash.classList.remove('button_alt-active');
        const selectedButton = value === 'card' ? this.buttonCard : this.buttonCash;
        selectedButton.classList.add('button_alt-active');
    }


}