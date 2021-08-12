import { TypeCreditorModel } from "../type.creditor.model";

export interface TypeCreditorResponseModel{
    typeCreditorModel? : TypeCreditorModel;
    status? : boolean;
    message? : string;
}