import { IEvents } from "../base/events";
import { Component } from "./Component";
export interface IModal {
   content:HTMLElement;
}
export class Modal extends Component<IModal>{
     protected closeButton:HTMLButtonElement;
     protected events:IEvents;
     protected contentElement:HTMLElement;

     constructor(protected container: HTMLElement, events:IEvents ){
        super(container);
        this.events = events;
        this.closeButton = this.container.querySelector('.modal__close');
        this.contentElement = this.container.querySelector('.modal__content');
        this.closeButton.addEventListener('click', () => {
         this.close()
        })
        this.container.addEventListener('mousedown', (evt) =>{
         if (evt.target === evt.currentTarget){
            this.close();
         }
        })
        this.handleKeyDown = this.handleKeyDown.bind(this);

     }

     set content(value:HTMLElement){
       this.contentElement.replaceChildren(value);
     }

     open(){
        this.container.classList.add('modal_active');
        document.addEventListener('keyup', this.handleKeyDown)
        this.events.emit('modal:open')
     }

     close(){
        this.container.classList.remove('modal_active')
        this.events.emit('modal:close')
        document.removeEventListener('keyup', this.handleKeyDown)
     }

    protected handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape' && this.container.classList.contains('modal_active')) {
            this.close();
        }
    }
}   