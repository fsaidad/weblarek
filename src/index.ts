import { EventEmitter } from './components/base/events';
import { BasketModel, IErrors } from './components/model/BasketModel';
import { ProductApi } from './components/model/ProductApi';
import { ProductModel } from './components/model/ProductModel';
import { Basket } from './components/view/Basket';
import { CardBasket } from './components/view/CardBasket';
import { Contacts } from './components/view/Contacts';
import { Core } from './components/view/Core';
import { Modal } from './components/view/Modal';
import { OrderAddress } from './components/view/OrderAddress';
import { Product } from './components/view/Product';
import { ProductOpen } from './components/view/ProductOpen';
import { Success } from './components/view/Success';
import './scss/styles.scss';
import { IProduct, OrderPaymentMethod } from './types';
import { CDN_URL, API_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';


const api = new ProductApi(CDN_URL, API_URL)
const evt = new EventEmitter()

evt.onAll(({ eventName, data }) => console.log(eventName, data));

//модели данных
const productModel = new ProductModel(evt)
const basketModel = new BasketModel(evt)


//темплейты
const cardCatalogTemplate:HTMLTemplateElement = document.querySelector('#card-catalog')
const productOpenTemplate:HTMLTemplateElement = document.querySelector('#card-preview')
const productBasketTemplate:HTMLTemplateElement = document.querySelector('#card-basket')
const basketTemplate:HTMLTemplateElement = document.querySelector('#basket')
const orderTemplate:HTMLTemplateElement = document.querySelector('#order')
const contactsTemplate:HTMLTemplateElement = document.querySelector('#contacts')
const succesTemplate:HTMLTemplateElement = document.querySelector('#success')
const modalTemplate:HTMLElement = document.querySelector('#modal-container')



const CorePage:HTMLElement = document.querySelector('.page__wrapper')

const modal = new Modal(modalTemplate,evt)
const content = new ProductOpen(cloneTemplate(productOpenTemplate),evt)
const BasketModal = new Basket(cloneTemplate(basketTemplate),evt);
const orderMethod = new OrderAddress(cloneTemplate(orderTemplate),evt)
const contacts = new Contacts(cloneTemplate(contactsTemplate),evt);


const corePage = new Core(CorePage, evt)

//загрузка товаров
evt.on('products:loaded', () => {
  const productsArray = productModel.getProducts().map((product) => {
    const productInts = new Product(cloneTemplate(cardCatalogTemplate), evt, false)
    return productInts.render(product)
  });
  corePage.render({coreGallery:productsArray})
})




evt.on('productSelected', (data: {card:IProduct}) => {
  const {card} = data;
  const {description,title,category,price, image, id} = productModel.getProductById(card.id);
  const productOpen = {description,title,category,price, image, id};
  const InBasket = basketModel.isProductInBasket(productOpen.id);
  content.isInBasket = InBasket;
  modal.content = content.render(productOpen,);
  modal.open();
})


evt.on('product:add', (data: {card:IProduct}) =>{
  const {card} = data;
 const {title, price, id} = productModel.getProductById(card.id);
 const product = {title,price,id}
  basketModel.addToBasket(product);
})

evt.on('basket:open', () =>{
   modal.content = BasketModal.render()
modal.open();
})

evt.on('basketChanged',()=>{
  corePage.render({counter:basketModel.getBasket().length});
  BasketModal.price = basketModel.calculateTotal();
      const productsArray = basketModel.getBasket().map((product, index) => {
    const productInts = new CardBasket(cloneTemplate(productBasketTemplate), evt)
      productInts.index = index + 1;
    return productInts.render(product)
  });
    BasketModal.products = productsArray;
} )

evt.on('order:start', () => {
  basketModel.validateOrder();
  const arr = [basketModel.errors.address, basketModel.errors.payment]
  modal.content = orderMethod.render({valid:basketModel.validateOrder(),error:arr})
  modal.open();
})

evt.on('orderChanged',() =>{
orderMethod.error = basketModel.getCombinedOrderErrors();
contacts.error = basketModel.getCombinedContactErrors();
})


evt.on('order.address:change',(data:{field:string,value:string})=>{
  basketModel.setOrder('address', data.value); 
})

evt.on('payment:changed', (paymentData: {method: 'card' | 'cash'}) => {
    basketModel.setOrder('payment',paymentData.method);
});

evt.on('errors:changed', (errors:IErrors)=>{
  const {payment, address, phone, email} = errors;
  orderMethod.valid = !payment && !address
  contacts.valid = !phone && !email
})


evt.on('order:submit',()=>{
  modal.content = contacts.render({valid:basketModel.validateOrder()});
  modal.open();
})
evt.on('contacts:submit', ()=>{
  const successView = new Success(cloneTemplate(succesTemplate),evt);
  modal.content = successView.render({total:basketModel.calculateTotal()})
   const OrderPost = basketModel.getOrder();
  api.postOrder(OrderPost)
  .then(data =>{
    console.log('Заказ успешно отправлен', data)
  })
    .catch(error => {
    console.error('Ошибка отправки заказа:', error);
  });
  basketModel.clearBasket();
  basketModel.clearOrder();
  contacts.reset();
  orderMethod.reset();
})

evt.on('contacts.email:change', (data:{field:string,value:string})=>{
  basketModel.setOrder('email', data.value);
})

evt.on('contacts.phone:change', (data:{field:string,value:string})=>{
  basketModel.setOrder('phone', data.value);
})

evt.on('success:complete', () =>{
  modal.close();
})

evt.on('delete:product', (data: {card:IProduct}) => {
      const {card} = data;
  basketModel.removeFromBasket(card.id)
})



evt.on('modal:open',()=>{
  corePage.render({lock:true})
})
evt.on('modal:close',()=>{
  corePage.render({lock:false})
})
// получить данные
    api.getProducts()
    .then(data => {
      productModel.setProducts(data) ;
      evt.emit('products:loaded');
    })
        .catch(error => {
        console.log(error);
        evt.emit('api:error', { error })
    })