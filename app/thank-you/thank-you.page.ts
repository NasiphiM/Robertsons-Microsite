import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AnswerService} from "../services/answer.service";

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
})
export class ThankYouPage implements OnInit {
  alreadyEntered: boolean = false;
  constructor(
    private route : Router,
    private answerService: AnswerService
  ) { }

  ngOnInit() {
    this.answerService.startNewAnswer();
    // if (localStorage["done"] == "true"){
    //   this.alreadyEntered = true;
    // }
    // localStorage["done"] = "true";
  }

  goToHome(){
    this.route.navigate(['/home']);
  }
}
