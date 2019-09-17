import { PersonInterface } from '../interfaces/person';
import { Utils } from './Data';



export class Person implements PersonInterface{
  
    nome: string;
    nascita: string;
    franchigie: Array<any>;
    sesso: boolean;
    
    

    constructor(){
        this.nome = '';
        this.nascita = '';
        this.franchigie = Utils.getFranchigiaAdulti();
        this.sesso = null;
    }

    
}
