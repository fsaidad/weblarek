import { IProduct, OrderData, OrderPost} from "../../types";
import { Api, ApiListResponse } from "../base/api";



export class ProductApi extends Api implements IApiClient {
    protected readonly cdnBaseUrl: string;

    constructor(cdnBaseUrl: string, apiBaseUrl: string, options?: RequestInit) {
        super(apiBaseUrl, options);
        this.cdnBaseUrl = cdnBaseUrl;
    }

    /**
     * Получает список товаров с преобразованием URL изображений
     * @returns Promise с массивом товаров
     */
    async getProducts(): Promise<IProduct[]> {
        const response = await this.get<ApiListResponse<IProduct>>('/product');
        return response.items.map(this.enrichProductWithCdnUrl.bind(this));
    }

    /**
     * Получает конкретный товар по ID
     * @param id - ID товара
     * @returns Promise с данными товара
     */
    async getProduct(id: IProduct['id']): Promise<IProduct> {
        const product = await this.get<IProduct>(`/product/${id}`);
        return this.enrichProductWithCdnUrl(product);
    }

    /**
     * Отправляет данные заказа на сервер
     * @param order - Данные заказа
     * @returns Promise с результатом оформления заказа
     */
    async postOrder(order: OrderData): Promise<OrderPost> {
        return this.post<OrderPost>('/order', order);
    }

    /**
     * Добавляет базовый CDN URL к изображению товара
     * @param product - Объект товара
     * @returns Товар с обновленным URL изображения
     */
    protected enrichProductWithCdnUrl(product: IProduct): IProduct {
        return {
            ...product,
            image: `${this.cdnBaseUrl}${product.image}`
        };
    }
}

export interface IApiClient {
  getProducts(): Promise<IProduct[]>;
  getProduct(id: string): Promise<IProduct>;
  postOrder(order: OrderData): Promise<OrderPost>;
}

