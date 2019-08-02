import { Person } from './Person';

export class Data {
    plz_localita: string;
    paese_di_domicilio: string;
    email: string;
    persons: Person[];
}

export class Franchigia{
    id: string;
    text: string;

    constructor(){

    }

    setData(id: string, text: string){
        this.id = id;
        this.text = text;
    }
}