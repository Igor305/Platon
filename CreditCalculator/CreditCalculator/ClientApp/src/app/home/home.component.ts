import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CreditorModel } from '../models/creditor.model';
import { TypeCreditorModel } from '../models/type.creditor.model';
import { PlatonService } from '../services/platon.service';
import { CreditorResponseModel } from '../models/response/creditor.response.model';

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
  summMin?: number = 1;
  summMax?: number = 1000000000; 
  termMin?: number = 1;
  termMax?: number = 365;
  term?: number = 1;
  sumDelay?: number;
  sum?: number;
  bid?: number = 0;

  resultSum?: number;
  resultBid?: number;
  resultBidToType?: number;

  bidToType?: number;
  institut: string = "";
  typesInstitution?: string;

  creditorsModel?: CreditorResponseModel;
  types?: TypeCreditorModel[] = [];
  institutions: CreditorModel[] = []

  summ = new FormControl('', [
    Validators.required,
    (control: AbstractControl) => Validators.min(this.summMin)(control),
    (control: AbstractControl) => Validators.max(this.summMax)(control)
  ]);

  rate = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  
  matcher = new MyErrorStateMatcher();

  constructor(private viewportScroller: ViewportScroller, private  platonService: PlatonService) { }

  async ngOnInit() {
    await this.getCreditors();
    await this.platonService.addCountVisit();
    setInterval(() => this.getCreditors(), 1000);
  }

  async getCreditors(){
    this.creditorsModel = await this.platonService.getCreditors();
    this.institutions = this.creditorsModel.creditorModels;
  }

  async toDetail(elementId: string) {
    this.isDetail = true;
    await this.platonService.addCountInfo();
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

        if(institution.name == "Свій вибір"){
          this.isTypesInstitut = false;
          this.summMin = 1;
          this.summMax = 1000000000;
          this.termMin = 1;
          this.termMax = 365;
          this.types = [];  
          this.typesInstitution = "";    
        }
        
        else{
         
          if(institution.typeCreditorModels.length > 1){
            this.isTypesInstitut = true;
            this.types = institution.typeCreditorModels;
            this.typesInstitution = this.types[0].name;

            this.summMin = institution.typeCreditorModels[0].minSum;
            this.summMax = institution.typeCreditorModels[0].maxSum;
            this.termMin = institution.typeCreditorModels[0].minTerm;
            this.termMax = institution.typeCreditorModels[0].maxTerm;
            this.bidToType = institution.typeCreditorModels[0].bid;   
          }
          else{

            for(let type  of institution.typeCreditorModels){
              this.summMin = type.minSum;
              this.summMax = type.maxSum;
              this.termMin = type.minTerm;
              this.termMax = type.maxTerm;
              this.bid = type.bid;   
            }
            this.isTypesInstitut = false;
          }
        }
      } 
    }
    this.term = this.termMin;
    this.summ.updateValueAndValidity();
  }

  async changeTypeInstitut(){  

    this.summ.updateValueAndValidity(); 

    if (this.types != undefined){
    
      for(let type of this.types){
        
        if (type.name == this.typesInstitution){
          this.summMin = type.minSum;
          this.summMax = type.maxSum;
          this.termMin = type.minTerm;
          this.termMax = type.maxTerm;
          this.bidToType = type.bid;
        }
      }
    }  
    this.summ.updateValueAndValidity(); 
  }

  async toResult(elementId: string){

    if (this.sum == undefined){
      return;
    }

    if (this.isTypesInstitut){

      if (this.sum != undefined && this.bidToType != undefined && this.term != undefined && (this.sum >= this.summMin && this.sum <= this.summMax)){
              
        this.isResult = true;
        await this.platonService.addCountResult();
        await this.sleep(1);
        this.viewportScroller.scrollToAnchor(elementId);

        this.overpayment = Math.round(this.sum/100*(this.bidToType/365)*this.term);
        this.resultSum =  this.sum;
        this.resultBidToType = this.bidToType;
        this.result = this.sum + this.overpayment;

        this.sumDelay = Math.round(this.sum+(this.sum/100*3*this.term))

      }
      else {
        this.isResult = false;
      }
    }

    if (!this.isTypesInstitut){

      if (this.sum != undefined && this.bid != undefined && this.term != undefined && (this.sum >= this.summMin && this.sum <= this.summMax)){

        this.isResult = true;
        await this.platonService.addCountResult();
        await this.sleep(1);
        this.viewportScroller.scrollToAnchor(elementId);

        this.overpayment = Math.round(this.sum/100*(this.bid/365)*this.term);
        this.resultSum =  this.sum;
        this.resultBid = this.bid;
        this.result = this.sum + this.overpayment;     
        this.sumDelay = Math.round(this.sum+(this.sum/100*3*this.term))

      }
      else {
        this.isResult = false;
      }
    }  
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
