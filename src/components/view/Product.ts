import { IProduct } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "./Component";

export class Product<T> extends Component<IProduct> {
    protected events: IEvents;
    protected productImage:HTMLImageElement;
    protected productPrice:HTMLElement;
    protected productTitle:HTMLElement;
    protected productCategory:HTMLElement;
    

    constructor(protected container:HTMLElement, events:IEvents,   protected clickable: boolean = true){
        super(container)
this.events = events;
this.productImage = this.container.querySelector('.card__image');
this.productPrice = this.container.querySelector('.card__price');
this.productTitle = this.container.querySelector('.card__title');
this.productCategory = this.container.querySelector('.card__category');
        if (!this.clickable) {
            this.container.addEventListener('click', () =>
                this.events.emit(`productSelected`, { card: this })
            );
    }
}



set price(price:number){
    if (price == null){
        this.productPrice.textContent = 'Бесценно';
    } else
    this.productPrice.textContent = `${price} синапсов`;
}

set category(category: string){
    this.productCategory.textContent = category;
            const newClassName = CATEGORY_CLASSES[category];
    if (!this.productCategory.classList.contains(newClassName)) {

        Object.values(CATEGORY_CLASSES).forEach(className => {
            if (className !== newClassName) {
                this.productCategory.classList.remove(className);
            }
        });
        
        this.productCategory.classList.add(newClassName);
    }

}
set title(title:string){
    this.productTitle.textContent = title;
}
set image(src:string){
     this.productImage.src = src;
     this.productImage.alt = this.productTitle.textContent;
    }
}



const CATEGORY_CLASSES: Record<string, string> = {
    'другое': 'card__category_other',
    'дополнительное': 'card__category_additional',
    'кнопка': 'card__category_button',
    'хард-скил': 'card__category_hard',
    'софт-скил': 'card__category_soft'
}
type ProductCategory = keyof typeof CATEGORY_CLASSES