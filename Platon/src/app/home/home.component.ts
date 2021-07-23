import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { InstitutionModel } from '../models/institution.model';

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
  institut: string = "";
  percent?: number = 0;
  institutions: InstitutionModel[] = [
    {
      name : "Moneyveo",
      percent : 42,
    },
    {
      name : "MyCredit",
      percent : 25,
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
        this.percent = institution.percent;
      }
    }
  }

  async toResult(elementId: string){
    this.isResult = true;
    await this.sleep(1);
    this.viewportScroller.scrollToAnchor(elementId);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
