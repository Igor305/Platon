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
    console.log(creditors);

    return creditors;
  }

  public async addCreditors(creditorModel: CreditorModel){
    let creditors = await this.http.post<ResponseModel>('/api/creditors', creditorModel).toPromise();
    console.log(creditors);

    return creditors;
  }

  public async updateCreditors(creditorModel: CreditorModel){
    let creditors = await this.http.put<ResponseModel>('/api/creditors', creditorModel).toPromise();
    console.log(creditors);

    return creditors;
  }

  public async delete(name: string){
    let creditors = await this.http.delete<ResponseModel>('/api/creditors?name=' + name).toPromise();
    console.log(creditors);

    return creditors;
  }
}
