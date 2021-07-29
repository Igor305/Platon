import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { InstitutionModel } from '../models/institution.model';
import { TypeInstitutionModel } from '../models/type.model';

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

export class HomeComponent implements OnInit {

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
  types?: TypeInstitutionModel[] = [];
  institutions: InstitutionModel[] = [
    {
      name : "MyCredit",
      thereIsAType : true,

      types : [ 
        {
          name : "30 днів",
          bid : 726.35,
          term : 30
        },
        {
          name : "64 дні",
          bid : 584,
          term : 16
        },
      ]
    },
    {
      name : "Moneyveo",
      bid : 25,
      thereIsAType : false
    },
    {
      name: "Свій вибір"
    }
  ]

  summ = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);

  rate = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  
  matcher = new MyErrorStateMatcher();

  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
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
          this.types = institution.types;
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
       
        this.sumDelay = Math.round(this.sum+(this.sum/100*this.bid*this.term))

      }
    }  
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
