import {User} from "./user";
import {Priority} from "./priority";
/**
 * Created by EvSpirit on 24.03.2017.
 */
export class Task {
    taskId: number;
    title: string;
    description: string;
    //rework with dates
    date_start: string;
    deadline: string;
    startTime: string;
    endTime: string;
    //////
    version: string;
    parent: Task;
    developer: User;
    priority: Priority;
}