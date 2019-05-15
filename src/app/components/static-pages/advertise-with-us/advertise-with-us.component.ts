import { Component, OnInit } from "@angular/core";
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
  selector: "app-advertise-with-us",
  templateUrl: "./advertise-with-us.component.html",
  styleUrls: ["./advertise-with-us.component.css"]
})
export class AdvertiseWithUsComponent implements OnInit {
  advertiseForm: FormGroup;
  submitted: boolean;
  btnDisable: boolean;
  submitsuccess: boolean = false;
  constructor(private _formBuilder: FormBuilder,private sportsService: SportsService,) {}

  ngOnInit() {
    this.fnInitAdvertiseForm();
  }

  fnInitAdvertiseForm() {
    this.advertiseForm = this._formBuilder.group({
      fullname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      company: ["", Validators.required],
      phone: ["", Validators.required],
      textareavalue: ["", Validators.required]
    });
  }

    // convenience getter for easy access to form fields
    get f() { return this.advertiseForm.controls; }

  submit() {
    this.submitted = true;
    if(this.advertiseForm.valid){
      let data  = {
        sName:this.advertiseForm.controls.fullname.value,
        sEmail:this.advertiseForm.controls.email.value,
        sCompanyName:this.advertiseForm.controls.company.value,
        sMobile:this.advertiseForm.controls.phone.value,
        sMessage:this.advertiseForm.controls.textareavalue.value,
        eType:'Ad'
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

  anothersubmit(){
    setTimeout(() => {
      this.advertiseForm.reset();
      for (let name in this.advertiseForm.controls) {
          this.advertiseForm.controls[name].setErrors(null);
         }
    },100);
    this.submitsuccess = false   
  }

}
