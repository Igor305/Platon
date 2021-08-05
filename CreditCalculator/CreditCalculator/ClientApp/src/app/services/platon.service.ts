import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditorModel } from '../models/creditor.model';
import { CreditorResponseModel } from '../models/response/creditor.response.model';
import { ResponseModel } from '../models/response/response.model';

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

  public async addTypeCreditors(nameCreditor:string, creditorModel: CreditorModel){
    let creditor = await this.http.post<ResponseModel>('/api/creditors/addTypeCreditor?nameCreditor=' + nameCreditor, creditorModel).toPromise();

    return creditor;
  }

  public async delTypeCreditors(nameCreditor:string, nameTypeCreditor: string){
    let creditor = await this.http.delete<ResponseModel>('/api/creditors/delTypeCreditor?nameCreditor=' + nameCreditor + '&&nameTypeCreditor=' + nameTypeCreditor).toPromise();

    return creditor;
  }

  public async deleteCreditor(name: string){
    let creditor = await this.http.delete<ResponseModel>('/api/creditors?name=' + name).toPromise();

    return creditor;
  }
}
