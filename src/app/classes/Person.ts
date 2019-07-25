import { PersonInterface } from '../interfaces/person';

export class Person implements PersonInterface{
    id: number;
    nome: string;
    nascita: string;
    sesso: string;
    plz_paese: string;
    

    constructor(){
        this.id;
        this.nome = '';
        this.nascita = '';
        this.sesso = '';
        this.plz_paese = '';
    }

}