import { PersonInterface } from '../interfaces/person';

const _franchigie = [ 
  { id: "1", value: "100", selected: 'false' }, 
  { id: "2", value: "200", selected: 'false' }, 
  { id: "3", value: "300", selected: 'true' } 
  ];

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
