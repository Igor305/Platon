import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../home/home.component';
import { CreditorModel } from '../models/creditor.model';
import { CreditorResponseModel } from '../models/response/creditor.response.model';
import { TypeCreditorResponseModel } from '../models/response/type.creditor.response.model';
import { TypeCreditorModel } from '../models/type.creditor.model';
import { PlatonService } from '../services/platon.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.sass']
})
export class ConfigComponent implements OnInit {

  isAdd: boolean = false;
  isTypeCreate: boolean = false;
  isTypeUp: boolean = false;
  isTypeUpdate: boolean = false;
  isCreate: boolean = false;
  isAddType: boolean = false;
  isType : boolean = false;
  isRename : boolean = false;

  countVisit: number;
  countInfo: number;
  countResult: number;
  countVisitForMonth: number;
  countInfoForMonth: number;
  countResultForMonth: number;

  message?: string = "";

  renameCreditor?: string;

  nameCreditor?: string;
  sumMinCreditor?: number;
  sumMaxCreditor?: number;
  termMinCreditor?: number;
  termMaxCreditor?: number;
  bidCreditor?: number;

  nameTypeCreditor?: string;
  sumMinTypeCreditor?: number;
  sumMaxTypeCreditor?: number;
  termMinTypeCreditor?: number;
  termMaxTypeCreditor?: number;
  bidTypeCreditor?: number;

  nameTypeCreditorUpdate?: string;
  sumMinTypeCreditorUpdate?: number;
  sumMaxTypeCreditorUpdate?: number;
  termMinTypeCreditorUpdate?: number;
  termMaxTypeCreditorUpdate?: number;
  bidTypeCreditorUpdate: number;

  creditorsModel?: CreditorResponseModel;
  typeCreditorModel?: TypeCreditorResponseModel;
  creditors : CreditorModel[] = [];
  creditor : CreditorModel = {};
  typeCreditor : TypeCreditorModel = {};

  name = new FormControl('', [
    Validators.required
  ]);
  sumMin = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  sumMax = new FormControl('', [
    Validators.required,
  ]);
  termMin = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  termMax = new FormControl('', [
    Validators.required
  ]);
  bid = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);

  nameType = new FormControl('', [
    Validators.required
  ]);
  sumMinType = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  sumMaxType = new FormControl('', [
    Validators.required,
  ]);
  termMinType = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);
  termMaxType = new FormControl('', [
    Validators.required
  ]);
  bidType = new FormControl('', [
    Validators.required,
    Validators.min(0)
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private platonService: PlatonService) { }

  async ngOnInit(){
    await this.getCreditors();
    await this.getСounters();
  }

  async getСounters (){

    let counters = await this.platonService.getСounters();
    this.countVisit = counters.countVisit;
    this.countInfo = counters.countInfo;
    this.countResult = counters.countResult;
    this.countVisitForMonth = counters.countVisitForMonth;
    this.countInfoForMonth = counters.countInfoForMonth;
    this.countResultForMonth = counters.countResultForMonth;
  }


  async openMenuRename(nameCreditor: string){

    if (!this.isRename){
      this.isRename = true;  
      this.renameCreditor = this.nameCreditor = nameCreditor;
      return;
    }

    if (this.isRename){

      if(this.nameCreditor == nameCreditor){
        this.isRename = false; 
      }
      this.nameCreditor = nameCreditor;
      return;
    }
  }

  async rename (name: string){
    
    let result = await this.platonService.renameCreditor(name, this.renameCreditor);   
    this.message = result.message; 
    
    this.isRename = false;
    await this.getCreditors();
  }

  async getCreditors(){
    this.creditorsModel = await this.platonService.getCreditors();
    this.creditors = this.creditorsModel.creditorModels;
  }

  async openMenuAddCreditor(){
    if (!this.isAdd){
      this.isAdd = true;
      return;
    }

    if (this.isAdd){
      this.isAdd = false;
      return;
    }
  }

  async openMenuAddTypeCreditor(nameCreditor : string){

    if (!this.isAddType){
      this.isAddType = true;
      this.nameCreditor = nameCreditor;
      return;
    }

    if (this.isAddType){

      if(this.nameCreditor == nameCreditor){
        this.isAddType = false; 
      }
      this.nameCreditor = nameCreditor;
      return;
    }
  }

  async openMenuUpdateTypeCreditor(nameCreditor: string ,nameTypeCreditor : string){
    
    if (!this.isTypeUpdate){
      this.isTypeUpdate = true;

      this.nameCreditor = nameCreditor;
      this.nameTypeCreditor = nameTypeCreditor;
      
      this.typeCreditorModel = await this.platonService.readTypeCreditor(nameCreditor,nameTypeCreditor);

      this.nameTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.name;
      this.sumMinTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.minSum;
      this.sumMaxTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.maxSum;
      this.termMinTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.minTerm;
      this.termMaxTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.maxTerm;
      this.bidTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.bid;

      return;
    }

    if (this.isTypeUpdate){

      if(this.nameTypeCreditor == nameTypeCreditor){
        this.isTypeUpdate = false; 
      }
      this.nameCreditor = nameCreditor;
      this.nameTypeCreditor = nameTypeCreditor;

      this.typeCreditorModel = await this.platonService.readTypeCreditor(nameCreditor,nameTypeCreditor);

      this.nameTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.name;
      this.sumMinTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.minSum;
      this.sumMaxTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.maxSum;
      this.termMinTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.minTerm;
      this.termMaxTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.maxTerm;
      this.bidTypeCreditorUpdate = this.typeCreditorModel.typeCreditorModel.bid;
      return;
    }
  }

  async addTypeCreditor(nameCreditor: string){

    await this.validatorCreateTypeCreditor();

    if (this.isTypeCreate){
      this.typeCreditor.name = this.nameTypeCreditor;
      this.typeCreditor.minSum = this.sumMinTypeCreditor;
      this.typeCreditor.maxSum = this.sumMaxTypeCreditor;
      this.typeCreditor.minTerm = this.termMinTypeCreditor;
      this.typeCreditor.maxTerm = this.termMaxTypeCreditor;
      this.typeCreditor.bid = this.bidTypeCreditor;
  
      let result = await this.platonService.addTypeCreditor(nameCreditor, this.typeCreditor);
      this.message = result.message; 

      this.isAddType = false;
      
      await this.getCreditors();
    }
  }

  async addCreditor(){

    await this.validatorCreateCreditor();

    if (this.isCreate){

      this.isCreate = false;

      this.creditor.name = this.nameCreditor;
      this.creditor.minSum = this.sumMinCreditor;
      this.creditor.maxSum = this.sumMaxCreditor;
      this.creditor.minTerm = this.termMinCreditor;
      this.creditor.maxTerm = this.termMaxCreditor;
      this.creditor.bid = this.bidCreditor;
      this.creditor.typeCreditorModels = [];

      this.typeCreditor.name =  this.nameTypeCreditor,
      this.typeCreditor.minSum = this.sumMinCreditor;
      this.typeCreditor.maxSum = this.sumMaxCreditor;
      this.typeCreditor.minTerm = this.termMinCreditor;
      this.typeCreditor.maxTerm = this.termMaxCreditor;
      this.typeCreditor.bid = this.bidCreditor;

      this.creditor.typeCreditorModels.push(this.typeCreditor);

      let result = await this.platonService.addCreditor(this.creditor);
      this.message = result.message;    

      this.isAdd = false;
      
      await this.getCreditors();
    }
  }

  async updateTypeCreditor(nameCreditor : string, nameTypeCreditor : string){

    await this.validatorUpdateTypeCreditor();

    if (this.isTypeUp){

      this.isTypeUp = false;

      let typeCreditorModel: TypeCreditorModel = {};

      typeCreditorModel.name = this.nameTypeCreditorUpdate
      typeCreditorModel.minSum = this.sumMinTypeCreditorUpdate;
      typeCreditorModel.maxSum = this.sumMaxTypeCreditorUpdate;
      typeCreditorModel.minTerm = this.termMinTypeCreditorUpdate;
      typeCreditorModel.maxTerm = this.termMaxTypeCreditorUpdate;
      typeCreditorModel.bid = this.bidTypeCreditorUpdate; 

      let result = await this.platonService.updateTypeCreditor(nameCreditor, nameTypeCreditor, typeCreditorModel);
      this.message = result.message;
      this.isTypeUpdate = false;

      await this.getCreditors();
    }
  }

  async delTypeCreditor(nameCreditor,nameTypeCreditor){
    let result = await this.platonService.delTypeCreditor(nameCreditor, nameTypeCreditor);
    this.message = result.message;
    await this.getCreditors();
  }

  async delCreditor(name: string){
    let result = await this.platonService.deleteCreditor(name);
    this.message = result.message;
    await this.getCreditors();
  }

  async validatorCreateCreditor(){

    if (this.nameCreditor == undefined){
      this.message = "Введіть назву кредитора"; 
    }
    else if (this.nameTypeCreditor == undefined){
      this.message = "Введіть назву типу кредитора"; 
    }
    else if(this.sumMinCreditor == undefined){
      this.message = "Введіть мінімальну суму кредиту"; 
    }
    else if(this.sumMinCreditor < 0){
      this.message = "Введіть додатне число, як мінімальну суму кредиту"; 
    } 
    else if(this.sumMaxCreditor == undefined){
      this.message = "Введіть максимальну суму кредиту"; 
    }
    else if(this.sumMaxCreditor < 0){
      this.message = "Введіть додатне число, як максимальну суму кредиту"; 
    }
    else if(this.termMinCreditor == undefined){
      this.message = "Введіть мінімальний термін кредиту"; 
    }
    else if(this.termMinCreditor < 0){
      this.message = "Введіть додатне число, як мінімальний термін кредиту"; 
    }
    else if(this.termMaxCreditor == undefined){
      this.message = "Введіть максимальний термін кредиту"; 
    }
    else if(this.termMaxCreditor < 0){
      this.message = "Введіть додатне число, як максимальний термін кредиту"; 
    }
    else if(this.bidCreditor == undefined){
      this.message = "Введіть відсоткову ставку"; 
    }
    else if(this.bidCreditor < 0){
      this.message = "Введіть додатне число, як відсоткову ставку"; 
    }
    else if(this.sumMinCreditor > this.sumMaxCreditor){
      this.message = "Мінімальна сумма кредиту не може бути більшою за максимальну сумму!"; 
    }
    else if(this.termMinCreditor > this.termMaxCreditor){
      this.message = "Мінімальний термін кредиту не може бути більшим за максимальний!"; 
    }
    else{
      this.isCreate = true;
    }
  }

  async validatorCreateTypeCreditor(){

    if (this.nameTypeCreditor == undefined){
      this.message = "Введіть назву типу кредитора"; 
    }
    else if(this.sumMinTypeCreditor == undefined){
      this.message = "Введіть мінімальну суму кредиту"; 
    }
    else if(this.sumMinTypeCreditor < 0){
      this.message = "Введіть додатне число, як мінімальну суму кредиту"; 
    } 
    else if(this.sumMaxTypeCreditor == undefined){
      this.message = "Введіть максимальну суму кредиту"; 
    }
    else if(this.sumMaxTypeCreditor < 0){
      this.message = "Введіть додатне число, як максимальну суму кредиту"; 
    }
    else if(this.termMinTypeCreditor == undefined){
      this.message = "Введіть мінімальний термін кредиту"; 
    }
    else if(this.termMinTypeCreditor < 0){
      this.message = "Введіть додатне число, як мінімальний термін кредиту"; 
    }
    else if(this.termMaxTypeCreditor == undefined){
      this.message = "Введіть максимальний термін кредиту"; 
    }
    else if(this.termMaxTypeCreditor < 0){
      this.message = "Введіть додатне число, як максимальний термін кредиту"; 
    }
    else if(this.bidTypeCreditor == undefined){
      this.message = "Введіть відсоткову ставку"; 
    }
    else if(this.bidTypeCreditor < 0){
      this.message = "Введіть додатне число, як відсоткову ставку"; 
    }
    else if(this.sumMinTypeCreditor > this.sumMaxTypeCreditor){
      this.message = "Мінімальна сумма кредиту не може бути більшою за максимальну сумму!"; 
    }
    else if(this.termMinTypeCreditor > this.termMaxTypeCreditor){
      this.message = "Мінімальний термін кредиту не може бути більшим за максимальний!"; 
    }
    else{
      this.isTypeCreate = true;
    }
  }

  async validatorUpdateTypeCreditor(){

    if (this.nameTypeCreditorUpdate == undefined){
      this.message = "Введіть назву типу кредитора"; 
    }
    else if(this.sumMinTypeCreditorUpdate == undefined){
      this.message = "Введіть мінімальну суму кредиту"; 
    }
    else if(this.sumMinTypeCreditorUpdate < 0){
      this.message = "Введіть додатне число, як мінімальну суму кредиту"; 
    } 
    else if(this.sumMaxTypeCreditorUpdate == undefined){
      this.message = "Введіть максимальну суму кредиту"; 
    }
    else if(this.sumMaxTypeCreditorUpdate < 0){
      this.message = "Введіть додатне число, як максимальну суму кредиту"; 
    }
    else if(this.termMinTypeCreditorUpdate == undefined){
      this.message = "Введіть мінімальний термін кредиту"; 
    }
    else if(this.termMinTypeCreditorUpdate < 0){
      this.message = "Введіть додатне число, як мінімальний термін кредиту"; 
    }
    else if(this.termMaxTypeCreditorUpdate == undefined){
      this.message = "Введіть максимальний термін кредиту"; 
    }
    else if(this.termMaxTypeCreditorUpdate < 0){
      this.message = "Введіть додатне число, як максимальний термін кредиту"; 
    }
    else if(this.bidTypeCreditorUpdate == undefined){
      this.message = "Введіть відсоткову ставку"; 
    }
    else if(this.bidTypeCreditorUpdate < 0){
      this.message = "Введіть додатне число, як відсоткову ставку"; 
    }
    else if(this.sumMinTypeCreditorUpdate > this.sumMaxTypeCreditorUpdate){
      this.message = "Мінімальна сумма кредиту не може бути більшою за максимальну сумму!"; 
    }
    else if(this.termMinTypeCreditorUpdate > this.termMaxTypeCreditorUpdate){
      this.message = "Мінімальний термін кредиту не може бути більшим за максимальний!"; 
    }
    else{
      this.isTypeUp = true;
    }
  }
}