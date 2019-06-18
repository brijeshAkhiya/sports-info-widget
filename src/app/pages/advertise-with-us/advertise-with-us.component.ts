import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

import { SportsService } from "@providers/sports-service";

@Component({
  selector: "app-advertise-with-us",
  templateUrl: "./advertise-with-us.component.html",
  styleUrls: ["./advertise-with-us.component.css"],
  encapsulation:ViewEncapsulation.None

})
export class AdvertiseWithUsComponent implements OnInit {
  
  advertiseForm: FormGroup;
  contactObj;
  submitted: boolean = false;
  submitsuccess: boolean = false;

  constructor(
    private sportsService: SportsService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.advertiseForm = this._formBuilder.group({
      sName: ["", Validators.required],
      sEmail: ["", [Validators.required, Validators.email]],
      sCompanyName: ["", Validators.required],
      sMobile: ["", Validators.required],
      sMessage: ["", Validators.required]
    });
  }

  get f() { return this.advertiseForm.controls; }

  submit() {
    this.submitted = true;
    if (this.advertiseForm.valid) {
      let data = this.advertiseForm.value;
      data.eType = 'Ad'
      if (data) {
        this.sportsService.postinquiries(data).subscribe((res) => {
          if (res['data']) {
            this.submitsuccess = true;
            this.submitted = false;
            this.advertiseForm.reset();
            this.initForm();
          }
        })
      }
    }
  }

  anothersubmit() {
    this.submitsuccess = false;
  }
}
