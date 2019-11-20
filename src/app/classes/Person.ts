import { PersonInterface } from '../interfaces/person';
import { Utils } from './Data';



export class Person implements PersonInterface{
  
    nome: string;
    nascita: string;
    franchigie: Array<any>;
    sesso: boolean;
    infortunio: boolean;
    basics: Array<any>;
    benefits: Array<any>;
    
    

    constructor(){
        this.nome = '';
        this.nascita = '';
        this.franchigie = Utils.getFranchigiaAdulti();
        this.sesso = null;
        this.infortunio = null;
        this.basics = null;
        this.benefits = null;
    }

    
}
