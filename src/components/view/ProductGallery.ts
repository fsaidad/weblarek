import { CATEGORY_CLASSES } from "../../types";
import { IEvents } from "../base/events";
import { Product } from "./Product";

interface IProductGallery{
    category:string;
    image:string;
}

export class ProductGallery<T> extends Product<IProductGallery>{
    protected productCategory:HTMLElement;
    protected productImage:HTMLImageElement;
    constructor(container:HTMLElement, events:IEvents, protected clickable: boolean = true){
        super(container,events);
        this.productCategory = this.container.querySelector('.card__category');
        this.productImage = this.container.querySelector('.card__image')
                if (!this.clickable) {
            this.container.addEventListener('click', () =>
                this.events.emit(`productSelected`, { card: this })
            );
    }
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

set image(src:string){
     this.productImage.src = src;
     this.productImage.alt = this.productTitle.textContent;
    }

}