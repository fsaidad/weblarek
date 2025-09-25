# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Данные и типы данных

Товар

```
  type IProduct = {
  id: string;
  description?: string;
  image?: string;
  title: string;
  category?: string;
  price: number | null;
  isInBasket?: boolean;
}

```

Заказ

```
  type OrderData = {
  payment: OrderPaymentMethod;
  address: string;
  email: string;
  phone: string;
  total: number;
  items: string[];
}

type OrderPaymentMethod = 'card' | 'cash'
```

### Базовый код

#### Класс Api

Назначение

Упрощенная обертка для работы с HTTP-API, предоставляющая базовые методы для GET и POST-запросов с обработкой ошибок и стандартными настройками.
Методы:
- `get` - Выполняет GET-запрос к указанному endpoint.
- `post` - 

#### Класс EventEmitter
Назначение
```
Реализация паттерна "Наблюдатель" для управления событиями в приложении. Поддерживает подписку на конкретные события, регулярные выражения и все события одновременно
```
Методы:
- `on` - Подписывает callback на указанное событие.
- `off` - Отписывает callback от события.
- `emit` - Инициализация события 

### Слой данных

#### Класс ProductModel
```
Класс отвечает за хранение и логику работы с данными товаров.
В полях класса хранятся следующие данные:
```
- `products: IProduct[] = []` - массив товаров
- `events: IEvents` - брокер событий


Класс имеет следующие методы:
- `getProducts(): Readonly<IProduct[]>` - получить список товаров
- `setProducts(newProducts: IProduct[]): void` - изменить список товаров
- `getProductById(cardId:string)` - получить товар по айди

#### Класс BasketModel
```
класс, реализующий интерфейс IBasketModel для управления корзиной покупок и данными заказа. Класс предоставляет функциональность для работы с товарами, валидации данных заказа и взаимодействия с системой событий.
```
Конструктор:\
constructor(events: IEvents)

В полях класса хранятся следующие данные:
- basket: IProduct[] - массив товаров в корзине
- order: Partial<OrderData> - данные заказа
- events: IEvents - система событий
- errors: IErrors - объект с ошибками валидаци

Класс имеет следующие методы:

Управление корзиной:
- `getBasket(): Readonly<IProduct[]>` - получить копию массива товаров в корзине

- `addToBasket(product: IProduct): void` - добавить товар в корзину (если его еще нет)

- `removeFromBasket(productId: string): void` - удалить товар из корзины по ID

- `clearBasket(): void` - очистить всю корзину

- `isProductInBasket(productId: string): boolean` - проверить наличие товара в корзине

Управление заказом:

- `getOrder(): Readonly<Partial<OrderData>>` - получить копию данных заказа

- `setOrder(field: keyof OrderData, value: any): void` - установить значение для поля заказа

- `clearOrder(): void` - очистить данные заказа

- `calculateTotal(): number` - вычислить общую стоимость товаров в корзине

Валидация и ошибки:

- `validateOrder(): boolean` - проверить валидность данных заказа

- `getError(field: keyof IErrors): string | undefined` - получить ошибку для конкретного поля

- `getCombinedOrderErrors(): string` - получить объединенные ошибки заказа (payment, address)

- `getCombinedContactErrors(): string` - получить объединенные ошибки контактов (email, phone)

### Классы представления

#### Класс Component
```
Является родителем для всех остальных классов представления, и предоставляет им метод рендер.
```

конструктор:

- constructor(protected readonly container: HTMLElement)

метод:
- `render(data?: Partial<T>): HTMLElement` - Основной метод для обновления и отрисовки компонента.
#### Класс Modal

Реализует модальное окно.
- `constructor(container:HTMLElement, events:IEvents)`

Поля класса:
- `closeButton` - кнопка закрытия модального окна

- `events` - шина событий

- `contentElement` - контейнер для содержимого модального окна

Методы:
- `open` - открытие модального окна.
- `close` - закрытие модального окна.
- `set content(value:HTMLElement)` - устанавливает контент внутри модального окна

#### Класс Core

Отвечает за отображение на главной странице:

- карточек товаров
- кнопка корзины
- счетчик корзины

конструктор:

- `constructor(container:HTMLElement, events:IEvents)`

Поля класса:

- `events` - шина событий

- `buttonBasket` — кнопка открытия корзины

- `gallery` — контейнер для отображения товаров

- `count` — счетчик товаров в корзине

Методы:
- `set counter(value: number)` - количество товаров в корзине

- `set coreGallery(items:HTMLElement[])` - карточки товаров

- `set lock(isLocked: boolean)` - блокирует и разблокирует прокрутку страницы

#### Класс Product<T> (Базовый компонент карточки товара)
```
Универсальный компонент для отображения карточки товара. Управляет основными элементами: изображением, ценой, названием и категорией.
```
Конструктор:

`constructor(container: HTMLElement, events: IEvents, clickable: boolean)`

Поля:

- `events` — шина событий

- `productImage` — изображение товара

- `productPrice` — элемент цены

- `productTitle` — название товара

- `productCategory` — категория товара

методы:

- `price: number` - Сеттер для установки цены. При null отображает "Бесценно".

- `category: string` - Сеттер для категории товара. 
Автоматически применяет CSS-классы в зависимости от категории.

- `title: string` - Сеттер для названия товара.

- `image: string` - Сеттер для изображения товара. Устанавливает src и alt.


#### Класс ProductOpen
```
Расширяет базовый класс Product для отображения детальной информации о товаре. Управляет кнопкой добавления/удаления из корзины и описанием товара.
```
Конструктор:

`constructor(container: HTMLElement, events: IEvents)`

Поля класса:

- `buttonProduct` — кнопка действия с товаром

- `events` — шина событий

- `cardText` — элемент описания товара

- `_isInBasket` — флаг нахождения в корзине

методы:
- `description(text:string)` - добавляет карточке описание

- `isInBasket(boolean: boolean)` - меняет название кнопки в зависимости от того есть ли товар в корзине

#### Класс Basket
```
Класс отвечает за отображение корзины покупок в интерфейсе.
```
Конструктор:

`constructor(container: HTMLElement, events: IEvents) `
Поля класса:

- `events: IEvents` - брокер событий

- `productContainer: HTMLElement` - контейнер для списка товаров

- `basketButton: HTMLButtonElement` - кнопка оформления заказа

- `basketPrice: HTMLElement` - элемент отображения общей стоимости

Методы:

- `set products(productList: HTMLElement[])` - устанавливает список товаров в корзину

- `set price(price: number)`- устанавливает общую стоимость корзины
#### Класс CardBasket
```
Класс отвечает за отображение товара в корзине покупок.
Наследуется от Product<ICardBasket> и добавляет функциональность 
для работы с позицией товара в корзине и кнопкой удаления.
```
Конструктор:

 `constructor(container: HTMLElement, events: IEvents)`

Поля класса:

- `basketIndex: HTMLElement` - элемент отображения номера позиции в корзине

- `events: IEvents` - брокер событий

- `buttonDel: HTMLButtonElement` - кнопка удаления товара из корзины

Методы:

- `set index(index: number)` - устанавливает номер позиции товара в корзине

#### Класс Form<T>
```
Универсальный класс для работы с HTML-формами.
Наследуется от Component<IForm> и предоставляет базовую функциональность 
для управления формами, валидации и обработки событий.
```

Поля класса:

- `submitButton: HTMLButtonElement` - кнопка отправки формы

- `errors: HTMLElement` - элемент для отображения ошибок

- `events: IEvents` - брокер событий

- `formName: string` - имя формы (из атрибута name)

Конструктор:

`constructor(container: HTMLElement, events: IEvents)`

Методы:

- `onInputChange(field: keyof T, value: string): void` - обрабатывает изменение поля ввода

- `set error(error: string)` - устанавливает текст ошибки формы

- `set valid(state: boolean)` - управляет состоянием кнопки отправки

- `getFormData(): FormData` - получает данные формы в объекте FormData

- `reset(): void` - сбрасывает значения формы

- `render(data?: Partial<IForm>): HTMLFormElement` - рендерит форму с переданными данными.

#### Класс OrderAddress
```
Класс отвечает за форму ввода адреса и выбора способа оплаты заказа.
Наследуется от Form<IOrder> и добавляет функциональность 
для переключения между способами оплаты.
```
Конструктор:

- `constructor(container: HTMLFormElement, events: IEvents)`

Поля класса:

- `buttonCard: HTMLButtonElement` - кнопка выбора оплаты картой

- `buttonCash: HTMLButtonElement` - кнопка выбора оплаты наличными

- `events: IEvents` - брокер событий

Методы:

- `togglePaymentMethod(method: 'card' | 'cash'): void` - переключает способ оплаты

#### Класс Contacts

```
Класс отвечает за форму ввода контактных данных заказа.
Наследуется от Form<IContacns> и использует базовую функциональность 
формы для работы с контактной информацией.
```

Конструктор:

`constructor(container: HTMLFormElement, events: IEvents)`

Поля класса:

- `events: IEvents` - брокер событий


#### Класс Succes
```
Класс отвечает за отображение успешного завершения заказа.
```
Конструктор:

`constructor(container: HTMLElement, events: IEvents)`

Поля класса:

- `events: IEvents` - брокер событий

- `buttonSuccess: HTMLButtonElement` - кнопка закрытия окна успеха

- `totalSuccess: HTMLElement` - элемент отображения суммы заказа

Методы:

- `set total(total: Number)` - устанавливает сумму успешного заказа

### Слой коммуникаций

#### Класс ProductApi
Принимает в конструктор api, и предоставляет методы для взаимодействия с бекенд сервисом.

## Взаимодействие компонентов
код описывающий взаимодействие и предоставление данных между собой находится  в файле `index.ts`, выполняет роль презентера.
взаимодействие осуществляется за счет событий генерируемых брокером событий и обраточиков этих событий, описанных в `index.ts`.

Список всех событий:

Продукты

- products:loaded - товары загружены
- productSelected - выбран товар для просмотра
- product:add - добавление товара в корзину

Корзина

- basket:open - открытие корзины
- basketChanged - изменение содержимого корзины
- delete:product - удаление товара из корзины

Оформление заказа

- order:start - начало оформления заказа
- orderChanged - изменение данных заказа
- order.address:change - изменение адреса
- payment:changed - изменение способа оплаты
- order:submit - переход к контактам
- contacts:submit - завершение заказа
- contacts.email:change - изменение email
- contacts.phone:change - изменение телефона

Модальные окна

- modal:open - открытие модального окна
- modal:close - закрытие модального окна

Прочие

- errors:changed - изменение ошибок валидации
- success:complete - завершение успешного заказа

