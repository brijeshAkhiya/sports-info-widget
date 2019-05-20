import { Component, OnInit, HostListener } from "@angular/core";
import { SportsService } from "../../providers/sports-service";

@Component({
  selector: "app-main-footer",
  templateUrl: "./main-footer.component.html",
  styleUrls: ["./main-footer.component.css"]
})
export class MainFooterComponent implements OnInit {
  isapply: boolean;
  contactObj: {};

  constructor(private sportsService: SportsService) {}

  isShow: boolean;
  topPosToStartShowing = 100;

  ngOnInit() {
    this.getContactDetails();
  }

  getContactDetails() {
    this.sportsService.getcontactdetails().subscribe(res => {
      if (res["data"]) {
        this.contactObj = {};
        res["data"].map(s => {
          this.contactObj[s.sKey] = s.sValue;
        });
      }
    });
  }

  @HostListener("window:scroll")
  checkScroll() {
    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
}
