import { PersonInterface } from '../interfaces/person';

export class Person implements PersonInterface{
  
    nome: string;
    nascita: string;
    sesso: boolean;
    
    

    constructor(){
        this.nome = '';
        this.nascita = '';
        this.sesso;
    }


}