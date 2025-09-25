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
export type OrderData = {
  payment?: OrderPaymentMethod;
  address?: string;
  email?: string;
  phone?: string;
  total?: number;
  items?: string[];
};

export interface OrderPost {
  id:string;
  total:number;
}

export type TModalCart = Pick<IProduct, 'title'|'price'>

export interface IProductModel {
 getProducts(): Readonly<IProduct[]>;
 getProductById(cardId: string): IProduct | undefined;
 setProducts(newProducts: IProduct[]): void;
}

export interface IBasketModel {
    errors: IErrors;
    
    getBasket(): Readonly<IProduct[]>;
    getOrder(): Readonly<Partial<OrderData>>;
    addToBasket(product: IProduct): void;
    setOrder(field: keyof OrderData, value: any): void;
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
