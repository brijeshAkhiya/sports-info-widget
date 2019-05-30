import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SportsService } from "../../../providers/sports-service";

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  encapsulation:ViewEncapsulation.None

})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted: boolean;
  btnDisable: boolean;
  contactObj: {};
  submitsuccess:boolean = false
  constructor(private _formBuilder: FormBuilder,private sportsService: SportsService,) {}

  ngOnInit() {
    this.fnInitContactForm();
    this.getContactDetails();
  }

  fnInitContactForm() {
    this.contactForm = this._formBuilder.group({
      fullname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      subject: ["", Validators.required],
      msgvalue: ["", Validators.required]
    });
  }

    // convenience getter for easy access to form fields
    get f() { return this.contactForm.controls; }

    submit() {
      this.submitted = true;
      if(this.contactForm.valid){
        let data  = {
          sName:this.contactForm.controls.fullname.value,
          sEmail:this.contactForm.controls.email.value,
          sSubject:this.contactForm.controls.subject.value,
          sMessage:this.contactForm.controls.msgvalue.value,
          eType:'Contact'
        }
        if(data){  
        this.btnDisable = true
        this.sportsService.postinquiries(data).subscribe((res)=>{
          if(res['data']){
            this.submitsuccess = true
          }
        })
        }
      }
    }

    getContactDetails(){
      this.sportsService.getcontactdetails().subscribe((res)=>{
          if(res['data']){
            this.contactObj = {};
            res['data'].map((s)=>{
              this.contactObj[s.sKey] = s.sValue
            })
          }
      })
    }

    anothersubmit(){
      setTimeout(() => {
        this.contactForm.reset();
        for (let name in this.contactForm.controls) {
            this.contactForm.controls[name].setErrors(null);
           }
      },100);
      this.submitsuccess = false   
    }

}
