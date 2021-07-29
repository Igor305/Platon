import { TypeCreditorModel } from "./type.creditor.model";

export interface CreditorModel{
    name?: string;
    bid?: number;
    thereIsAType?: boolean;
    types?: TypeCreditorModel[];
}