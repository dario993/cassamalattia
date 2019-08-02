import { PersonInterface } from '../interfaces/person';

const _franchigie = ['100', '200', '300'];

export class Person implements PersonInterface{
  
    nome: string;
    nascita: string;
    franchigie: Array<any>;
    sesso: boolean;
    
    

    constructor(){
        this.nome = '';
        this.nascita = '';
        this.franchigie = _franchigie;
        this.sesso = null;
    }


}