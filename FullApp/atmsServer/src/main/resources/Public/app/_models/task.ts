import {User} from "./user";
import {Priority} from "./priority";
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
    parent: Task;
    developer: User;
    priority: Priority;
}