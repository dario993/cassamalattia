import { Person } from './Person';

export class Data {
    plz_localita: Plz;
    paese_di_domicilio: string;
    email: string;
    persons: Person[];

    
}

export class Plz{
    id: number;
    plz: string;
    paese: string;
}

export class Utils{
    
     public static getFranchigiaAdulti(): Array<any>{
        const franchigia= [ 
            { id: "2500", value: "2500", selected: 'true' }, 
            { id: "2000", value: "2000", selected: 'false' }, 
            { id: "1500", value: "1500", selected: 'false' }, 
            { id: "1000", value: "1000", selected: 'false' }, 
            { id: "500", value: "500", selected: 'false' }, 
            { id: "300", value: "300", selected: 'false' },
            ];
        return franchigia; 
      }

    public static getFranchigiaMinori(): Array<any>{
        const franchigia= [ 
            { id: "600", value: "600", selected: 'true' }, 
            { id: "500", value: "500", selected: 'false' }, 
            { id: "400", value: "400", selected: 'false' }, 
            { id: "300", value: "300", selected: 'false' }, 
            { id: "200", value: "200", selected: 'false' }, 
            { id: "100", value: "100", selected: 'false' },
            { id: "0", value: "0", selected: 'false' },
            ];
        return franchigia; 
      }

    public static calculateAge(birthday) { // birthday is a date
        var anno_corrente = 2020;
        var array = birthday.split('.');
        var eta = anno_corrente - array[2];
        
        return eta;
       }

    constructor(){

    }

    
}