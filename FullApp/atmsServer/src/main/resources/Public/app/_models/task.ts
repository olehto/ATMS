import {User} from "./user";
import {Priority} from "./priority";
import {Type} from "./type";
/**
 * Created by EvSpirit on 24.03.2017.
 */
export class Task {
    taskId: number;
    title: string;
    description: string;
    dateStart: number;
    deadline: number;
    duration: number;
    version: string;
    type: Type;
    parent: Task;
    developer: User;
    priority: Priority;
    constructor(){
        //this.parent=new Task();
        this.developer=new User();
        this.priority=new Priority();
        this.type=new Type();
    }
}