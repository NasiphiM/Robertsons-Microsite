import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonalInfoModel} from "../models/personal-info-model";
import {AnswerModel} from "../models/answer-model";
import {Constants} from "../constants";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private answers: any[] = [];
  private surveyId: number | null = null;
  private userDetails: PersonalInfoModel = {
    fullname: '',
    phoneNumber: '',
    emailAddress: '',
    consent: ''
  };
  private questionnaireDetails = Constants.config[environment.storePrefix];

  constructor(private http: HttpClient) { }

  startNewAnswer() {
   this.answers = [];
  }

  addAnswer(answer: AnswerModel) {
    const existingAnswerIndex = this.answers.findIndex(a => a.questionId === answer.questionId);
    //this.answers.push(answer);
    if (existingAnswerIndex !== -1) {
      this.answers[existingAnswerIndex] = answer;
    } else {
      this.answers.push(answer);
    }

  }

  setUserDetails(userDetails: PersonalInfoModel) {
    this.userDetails = userDetails;
  }
  getUserDetails() {
    return this.userDetails;
  }

  saveAnswers(model: AnswerModel) {
    let userDetails = this.userDetails;
    const questionIds = this.questionnaireDetails.questionIds;
    let answers: any[] = [
      { questionnaireQuestionID: questionIds['name'], answer: userDetails.fullname }, //6
      { questionnaireQuestionID: questionIds['contactNumber'], answer: userDetails.phoneNumber }, //7
      { questionnaireQuestionID: questionIds['emailAddress'], answer: userDetails.emailAddress }, //8
      { questionnaireQuestionID: questionIds['consent'], answer: userDetails.consent } //9
    ];

    let a = this.answers.map(a => {
      let qa: any = {
        questionnaireQuestionID: a.questionId,
        answer: a.answerText
      };
      return qa;
    });
    answers.push(...a);

    let answerModel : any = {
      questionnaireID: this.questionnaireDetails.questionnaireId,
      questionnaireSections: [{
        questionnaireSectionID: this.questionnaireDetails.questionnaireSectionId,
        answers: answers
      }],
      questionnaireType : 2,
      latitude: null,
      longitude: null
    };

    return this.http.post<number>(`${environment.apiUrl}/Answers/${this.questionnaireDetails.shiftId}/${this.questionnaireDetails.individualID}`, answerModel);

  }

}
