import { TypeCreditorModel } from "./type.creditor.model";

export interface CreditorModel{
    name?: string;
    minSum?: number;
    maxSum?: number;
    minTerm?: number;
    maxTerm?: number;
    bid?: number;
    thereIsAType?: boolean;
    typeCreditorModels?: TypeCreditorModel[];
}