import { Component, OnInit } from '@angular/core';
import { CreditorModel } from '../models/creditor.model';
import { ResponseModel } from '../models/response/response.model';
import { PlatonService } from '../services/platon.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.sass']
})
export class ConfigComponent implements OnInit {

  name: string;
  bid: number;
  isType : boolean = false;
  creditor : CreditorModel = {};
  result : string;


  constructor(private platonService: PlatonService) { }

  ngOnInit(): void {
  }

  async addCreditor(){

    this.creditor.name = this.name;
    this.creditor.bid = this.bid;
    let result = await this.platonService.addCreditor(this.creditor);
    this.result = result.message;
  }

  async deleteType(){
    
    let result = await this.platonService.deleteCreditor(this.name);
    this.result = result.message;
  }

}
