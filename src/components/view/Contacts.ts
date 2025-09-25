import { IEvents } from "../base/events";
import { Component } from "./Component";
import { Form } from "./Form";

export interface IContacns {
}
export class Contacts extends Form<IContacns>{
    protected events:IEvents;
    
    constructor(protected container:HTMLFormElement, events:IEvents){
        super(container,events);
    }


}