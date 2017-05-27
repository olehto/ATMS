import {User} from "./user";
import {Priority} from "./priority";
import {Type} from "./type";
import {Status} from "./status";
import {Technology} from "./technology";
import {Sprint} from "./sprint";
/**
 * Created by EvSpirit on 24.03.2017.
 */
export class Task {
    taskId: number;
    title: string;
    description: string;
    dateStart: number;
    deadline: number;
    assignedTime: number;
    closeTime: number;
    version: string;
    type: Type;
    parent: Task;
    developer: User;
    priority: Priority;
    status: Status ;
    sprint: Sprint;
    constructor(){
        //this.parent=new Task();
        this.status = new Status();
        this.developer=new User();
        this.priority=new Priority();
        this.type=new Type();
        this.sprint=new Sprint();
    }
}