import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

import { SportsService } from "@providers/sports-service";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  encapsulation:ViewEncapsulation.None

})
export class ContactComponent implements OnInit {
 
  contactForm: FormGroup;
  contactObj;
  submitted: boolean = false;
  submitsuccess: boolean = false;

  constructor(
    private sportsService: SportsService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.getContactDetails();
  }

  initForm() {
    this.contactForm = this._formBuilder.group({
      sName: ["", Validators.required],
      sEmail: ["", [Validators.required, Validators.email]],
      sSubject: ["", Validators.required],
      sMessage: ["", Validators.required]
    });
  }

  getContactDetails() {
    this.sportsService.getcontactdetails().subscribe((res: any) => {
      if (res.data) {
        this.contactObj = {};
        res.data.map((s) => {
          this.contactObj[s.sKey] = s.sValue
        })
      }
    })
  }

  get f() { return this.contactForm.controls; }

  submit() {
    this.submitted = true;
    if(this.contactForm.valid){
      let data  = this.contactForm.value;
      data.eType = 'Contact';
      if(data){  
      this.sportsService.postinquiries(data).subscribe((res)=>{
        if(res['data']){
          this.submitsuccess = true;
          this.submitted = false;
          this.contactForm.reset();
          this.initForm();
        }
      })
      }
    }
  }

  anothersubmit(){
    this.submitsuccess = false;
  }
}
