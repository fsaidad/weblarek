import { IBasketModel, IProduct, UserData,   } from "../../types";
import { IEvents } from "../base/events";

export class BasketModel implements IBasketModel {
protected basket: IProduct[] = [];
protected order: Partial<UserData> = {};
protected events: IEvents;
errors: IErrors;


constructor(events: IEvents){
    this.events = events;
    this.errors = {};
}

  getBasket(): Readonly<IProduct[]> {
    return [...this.basket]
  }
  getOrder(): Readonly<Partial<UserData>> {
    return { ...this.order }
  }

  addToBasket(product: IProduct): void {
    if (this.basket.some(item => item.id === product.id)) return
    this.basket = [...this.basket, product]
    this.events.emit('basketChanged')
    
  }

    setOrder(field: keyof UserData, value:string): void {
        this.order = {
            ...this.order,
            [field]: value
        };
        this.validateOrder();
        this.events.emit('orderChanged');
    }

    
validateOrder(): boolean {
  // Очищаем предыдущие ошибки
  this.errors = {};

  // Проверка email
  if (!this.order.email || !this.order.email.trim()) {
    this.errors.email = 'Email обязателен для заполнения';
  }

  // Проверка телефона
  if (!this.order.phone || !this.order.phone.trim()) {
    this.errors.phone = 'Телефон обязателен для заполнения';
  }

  // Проверка адреса
  if (!this.order.address || !this.order.address.trim()) {
    this.errors.address = 'Адрес обязателен для заполнения';
  }

  // Проверка способа оплаты
  if (!this.order.payment) {
    this.errors.payment = 'Выберите способ оплаты';
  }

this.events.emit('errors:changed',(this.errors))
  // Возвращаем true если нет ошибок
  return Object.keys(this.errors).length === 0;
}

getCombinedOrderErrors(): string {
    const errors = [
        this.errors.payment,
        this.errors.address
    ].filter(error => error);
    
    return errors.join(', ');
}

    getCombinedContactErrors(): string {
        const errors = [
            this.errors.email,
            this.errors.phone
        ].filter(error => error);
        
        return errors.join(', ');
    }

getError(field: keyof IErrors): string | undefined {
  this.validateOrder()
    return this.errors[field];

}

  clearOrder(): void {
    this.order = {};
}

  isProductInBasket(productId: string): boolean {
  return this.basket.some(item => item.id === productId)
}

  removeFromBasket(productId: string): void {
    this.basket = this.basket.filter(item => item.id !== productId)
    this.events.emit('basketChanged')
  }

  clearBasket(): void {
    this.basket = []
    this.events.emit('basketChanged')
  }

     calculateTotal(): number {
    return this.basket.reduce((sum, item) => sum + item.price, 0)
  }
}

export type IErrors = {
payment?:string;
address?:string;
phone?:string;
email?:string;
}
