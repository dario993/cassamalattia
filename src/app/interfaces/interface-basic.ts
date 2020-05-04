import {IBenefits} from './interface-benefits';

export interface IBasic{
    cod_assicurazione: string;
    id_premio: number;
    gruppo_assicurazione: string;
    nome: string;
    contratto: number;
    tipo_tariffa: string;
    n_bambini: number;
    plz_paese: string;
    franchigia: string;
    premio: string;
    persona: number;
    id_tariffa: string;
    it: string;
    fr: string;
    de: string;
    benefits: { benefits: IBenefits[], totale: string}; 
    
}