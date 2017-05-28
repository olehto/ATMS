import {Keyword} from "./keyword";
/**
 * Created by EvSpirit on 21.05.2017.
 */
export class TaskKeyword {
    taskKeywordId:number;
    importance:number;
    keyword:Keyword;
    constructor(){
        this.keyword = new Keyword();
    }
}