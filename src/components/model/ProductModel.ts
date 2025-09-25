import { IProductModel, IProduct } from "../../types";
import { IEvents } from "../base/events";

export class ProductModel implements IProductModel{
    protected products: IProduct[] = [];
    protected events: IEvents;

    constructor(events: IEvents){
      this.events = events;
    }

  
   getProducts(): Readonly<IProduct[]> {
    return [...this.products]
  }

  setProducts(newProducts: IProduct[]): void {
    this.products = newProducts
    this.events.emit('products:changed')
  }
  getProductById(cardId:string){
    return this.products.find((item) => item.id === cardId)
  }
  
}