import { Person } from './Person';

export class Data {
    plz_localita: string;
    paese_di_domicilio: string;
    email: string;
    persons: Person[];

    public calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
       }
}

export class Utils{
    
     public static getFranchigiaAdulti(): Array<any>{
        const franchigia= [ 
            { id: "2500", value: "2500", selected: 'false' }, 
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
            { id: "600", value: "600", selected: 'false' }, 
            { id: "500", value: "500", selected: 'false' }, 
            { id: "400", value: "400", selected: 'false' }, 
            { id: "300", value: "300", selected: 'false' }, 
            { id: "200", value: "200", selected: 'false' }, 
            { id: "100", value: "100", selected: 'false' },
            { id: "0", value: "0", selected: 'false' },
            ];
        return franchigia; 
      }

    constructor(){

    }

    
}