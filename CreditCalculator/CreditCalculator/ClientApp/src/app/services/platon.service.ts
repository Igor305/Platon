import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditorModel } from '../models/creditor.model';
import { CreditorResponseModel } from '../models/response/creditor.response.model';
import { ResponseModel } from '../models/response/response.model';
import { TypeCreditorResponseModel } from '../models/response/type.creditor.response.model';
import { TypeCreditorModel } from '../models/type.creditor.model';

@Injectable({
  providedIn: 'root'
})
export class PlatonService {

  constructor(private http: HttpClient) { }

  public async getCreditors(){

    let creditors = await this.http.get<CreditorResponseModel>('/api/creditors').toPromise();

    return creditors;
  }

  public async addCreditor(creditorModel: CreditorModel){

    let creditor = await this.http.post<ResponseModel>('/api/creditors', creditorModel).toPromise();

    return creditor;
  }

  public async addTypeCreditor(nameCreditor:string, creditorModel: CreditorModel){

    let creditor = await this.http.post<ResponseModel>('/api/creditors/addTypeCreditor?nameCreditor=' + nameCreditor, creditorModel).toPromise();

    return creditor;
  }

  public async readTypeCreditor(nameCreditor: string, nameTypeCreditor: string){

    console.log(nameTypeCreditor);
    let creditor = await this.http.get<TypeCreditorResponseModel>('/api/creditors/readTypeCreditor?nameCreditor=' + nameCreditor + '&&nameTypeCreditor=' + nameTypeCreditor).toPromise();

    return creditor;
  }

  public async updateTypeCreditor(nameCreditor:string, nameTypeCreditor:string, typeCreditorModel: TypeCreditorModel){

    let creditor = await this.http.put<ResponseModel>('/api/creditors?nameCreditor=' + nameCreditor + "&&nameTypeCreditor=" + nameTypeCreditor, typeCreditorModel).toPromise();

    return creditor;
  }

  public async delTypeCreditor(nameCreditor:string, nameTypeCreditor: string){

    let creditor = await this.http.delete<ResponseModel>('/api/creditors/delTypeCreditor?nameCreditor=' + nameCreditor + '&&nameTypeCreditor=' + nameTypeCreditor).toPromise();

    return creditor;
  }

  public async deleteCreditor(name: string){

    let creditor = await this.http.delete<ResponseModel>('/api/creditors?name=' + name).toPromise();

    return creditor;
  }
}
