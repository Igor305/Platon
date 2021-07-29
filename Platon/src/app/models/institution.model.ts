import { TypeInstitutionModel } from "./type.model";

export interface InstitutionModel{
    name?: string;
    bid?: number;
    thereIsAType?: boolean;
    types?: TypeInstitutionModel[];
}