import {DevType} from "./dev.type";
/**
 * Created by EvSpirit on 21.03.2017.
 */
export class User {
    developerId: number;
    name: string;
    lastName: string;
    email: string;
    telephone: string;
    nickname: string;
    password: string;
    devType: DevType;
    devTypeId: number;
    dateOfBirth: number;
}