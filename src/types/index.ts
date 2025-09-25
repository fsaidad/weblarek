import { IErrors } from "../components/model/BasketModel";

//Товар
export type IProduct = {
  id: string;
  description?: string;
  image?: string;
  title: string;
  category?: string;
  price: number | null;
  isInBasket?: boolean;
};

//методы оплаты
export type OrderPaymentMethod = 'card' | 'cash';

//заказ
export type UserData = {
  payment: OrderPaymentMethod;
  address: string;
  email: string;
  phone: string;
};

export interface IOrderData{
  payment?: OrderPaymentMethod;
  address?: string;
  email?: string;
  phone?: string;
  total?:number;
  items?:string[];
}
export interface IResult{
  id: string;
  total: number;
}


export interface IProductModel {
 getProducts(): Readonly<IProduct[]>;
 getProductById(cardId: string): IProduct | undefined;
 setProducts(newProducts: IProduct[]): void;
}

export interface IBasketModel {
    errors: IErrors;
    
    getBasket(): Readonly<IProduct[]>;
    getOrder(): Readonly<Partial<UserData>>;
    addToBasket(product: IProduct): void;
    setOrder(field: keyof UserData, value: any): void;
    validateOrder(): boolean;
    getCombinedOrderErrors(): string;
    getCombinedContactErrors(): string;
    getError(field: keyof IErrors): string | undefined;
    clearOrder(): void;
    isProductInBasket(productId: string): boolean;
    removeFromBasket(productId: string): void;
    clearBasket(): void;
    calculateTotal(): number;
}

export const CATEGORY_CLASSES: Record<string, string> = {
    'другое': 'card__category_other',
    'дополнительное': 'card__category_additional',
    'кнопка': 'card__category_button',
    'хард-скил': 'card__category_hard',
    'софт-скил': 'card__category_soft'
}
export type ProductCategory = keyof typeof CATEGORY_CLASSES
