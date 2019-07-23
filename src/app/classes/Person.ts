import { PersonInterface } from '../interfaces/person';

export class Person implements PersonInterface{
    nome: string;
    nascita: string;
    sesso: string;
    plz_paese: string;
    

    constructor(){
       
        this.nome = '';
        this.nascita = '';
        this.sesso = '';
        this.plz_paese = '';
    }

}