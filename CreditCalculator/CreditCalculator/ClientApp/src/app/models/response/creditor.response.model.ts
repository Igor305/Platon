import { CreditorModel } from "../creditor.model";

export interface CreditorResponseModel{
    creditorModels?: CreditorModel[];
    status?: boolean;
    message?: string;
}