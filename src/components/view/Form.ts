import { IEvents } from "../base/events";
import { Component } from "./Component";
 export interface IForm{
    error: string[];
    valid:boolean;

 }
export class Form<T> extends Component<IForm>{
    protected submitButton:HTMLButtonElement;
    protected errors:HTMLElement;
    protected events:IEvents;
    protected formName:string;
    constructor(container:HTMLElement, events:IEvents){
        super(container);
        this.events = events;
        this.submitButton = this.container.querySelector('[type="submit"]');
         this.errors = this.container.querySelector('.form__errors');
         this.formName = this.container.getAttribute('name');

        		this.container.addEventListener('submit', (evt: Event) => {
			evt.preventDefault();
			this.events.emit(`${this.formName}:submit`);
		});
	    

                 this.container.addEventListener('input', (events:InputEvent) =>{
            const target = events.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field,value)
        })
    
    }
    	protected onInputChange(field: keyof T, value: string): void {
		this.events.emit(`${this.formName}.${String(field)}:change`, {
			field,
			value,
		});
	}

    set error(error:string){
        if(error){
        this.errors.textContent = error;}
        else{ this.errors.textContent = ''}
    }

    set valid(state:boolean){
        if(state){
        this.submitButton.disabled = false;
    }
        else{
            this.submitButton.disabled = true;
        }
    }

    getFormData(): FormData {
        return new FormData(this.container as HTMLFormElement);
    }

    reset(): void {
        (this.container as HTMLFormElement).reset();
    }
    
    render(data?: Partial<IForm>): HTMLFormElement {
        super.render(data);
        return this.container as HTMLFormElement;
    }

}