import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CreditorModel } from '../models/creditor.model';
import { TypeCreditorModel } from '../models/type.creditor.model';
import { PlatonService } from '../services/platon.service';
import { CreditorResponseModel } from '../models/response/creditor.response.model';
import { ThrowStmt } from '@angular/compiler';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective| NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent {
  isResult: boolean = false;
  isCount: boolean = false;
  isDetail: boolean = false;
  isTypesInstitut: boolean = false;
  overpayment?: number;
  result?: number;
  term?: number = 1;
  sumDelay?: number;
  sum?: number;
  institut: string = "";
  bid?: number = 0;
  bidToType?: number;
  typesInstitution?: string;
  creditorsModel?: CreditorResponseModel;
  types?: TypeCreditorModel[] = [];
  institutions: CreditorModel[] = []

  summ = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);

  rate = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  
  matcher = new MyErrorStateMatcher();

  constructor(private viewportScroller: ViewportScroller, private  platonService: PlatonService) { }

  async ngOnInit() {
    await this.getCreditors();
    //setInterval(() => this.getCreditors(), 1000);
  }

  async getCreditors(){
    this.creditorsModel = await this.platonService.getCreditors();
    this.institutions = this.creditorsModel.creditorModels;
    console.log(this.institutions);
  }

  async toDetail(elementId: string) {
    this.isDetail = true;
    await this.sleep(1);
    this.viewportScroller.scrollToAnchor(elementId);
  }

  async toDetailClose(elementId: string) {
    this.isDetail = false;
    await this.sleep(1);
    this.viewportScroller.scrollToAnchor(elementId);
  }

  async toCount(elementId: string ){
    this.isCount = true;
    await this.sleep(300);
    this.viewportScroller.scrollToAnchor(elementId);
  }
  
  async changeInstitut(){

    for(let institution of this.institutions){

      if(institution.name == this.institut){

        this.bid = institution.bid;

        if(institution.thereIsAType == true){
          this.isTypesInstitut = true;
          this.types = institution.typeCreditorModels;
        }
        else{
          this.isTypesInstitut = false;
        }
      } 
    }
  }

  async changeTypeInstitut(){  

    if (this.types != undefined){

      for(let type of this.types){

        if (type.name == this.typesInstitution){
          this.bidToType = type.bid;
        }

      }
    }
  }

  async toResult(elementId: string){

    if (this.sum == undefined){
      return;
    }
    this.isResult = true;
    await this.sleep(1);
    this.viewportScroller.scrollToAnchor(elementId);

    if (this.isTypesInstitut == true){

      if (this.sum != undefined && this.bidToType != undefined && this.term != undefined){
        
        this.overpayment = Math.round(this.sum/100*(this.bidToType/365)*this.term);
        this.result = this.sum + this.overpayment;

        this.sumDelay = Math.round(this.sum+(this.sum/100*this.bidToType*this.term))
        console.log(this.sumDelay)
      }
    }

    if (this.isTypesInstitut == false){

      if (this.sum != undefined && this.bid != undefined && this.term != undefined){

        this.overpayment = Math.round(this.sum/100*(this.bid/365)*this.term);
        this.result = this.sum + this.overpayment;
       
        this.sumDelay = Math.round(this.sum+(this.sum/100*3*this.term))

      }
    }  
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
