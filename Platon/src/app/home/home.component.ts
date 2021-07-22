import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  isCount: boolean = false;
  isDetail: boolean = false;

  summ = new FormControl('', [
    Validators.required
  ]);

  rate = new FormControl('', [
    Validators.required
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

  async toDetailClose() {
    this.isDetail = false;
  }

  async toCount(elementId: string ){
    this.isCount = true;
    await this.sleep(300);
    this.viewportScroller.scrollToAnchor(elementId);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
