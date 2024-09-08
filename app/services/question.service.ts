import { Injectable } from '@angular/core';
import {QuestionModel} from "../models/question-model";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: QuestionModel[] =[
    {
      questionId: 1,
      questionText: 'I confirm that I am 18 years or older',
      answer: {
        questionId: 57131,
        options: [
          {optionId: 1, optionText: 'Yes'},
          {optionId: 2, optionText: 'No'},
        ]
      }
    },
    {
      questionId: 2,
      questionText: 'I have purchased 2 or more Robertsons Spices, and have kept my till slip for the Grand Prize Draw',
      answer: {
        questionId: 57132,
        options: [
          {optionId: 1, optionText: 'Yes'},
          {optionId: 2, optionText: 'No'},
        ]
      }
    },
    {
      questionId: 3,
      questionText: 'Yes, I want to receive offers and updates from trusted Unilever brands via SMS and online advertising to my interests and preferences',
      answer: {
        questionId: 57133,
        options: [
          {optionId: 1, optionText: 'Yes'},
          {optionId: 2, optionText: 'No'},
        ]
      }
    },
    {
      questionId: 4,
      questionText: 'Yes, I want to receive offers and updates from trusted Unilever brands via email and online advertising to my interests and preferences',
      answer: {
        questionId: 57134,
        options: [
          {optionId: 1, optionText: 'Yes'},
          {optionId: 2, optionText: 'No'},
        ]
      }
    },
    {
      questionId: 5,
      questionText: 'At which mall did you make your Purchase and Enter',
      answer: {
          questionId : 57135,
          options: [
            {optionId: 1, optionText: 'Mall of Africa'},
            {optionId: 2, optionText: 'Eastgate Mall'},
            {optionId: 3, optionText: 'Maponya'},
            {optionId: 4, optionText: 'Tygervalley'},
            {optionId: 5, optionText: 'Canal Walk'},
            {optionId: 6, optionText: 'Gateway Theatre of Shopping'},
            {optionId: 7, optionText: 'Pavilion'}
          ]
      }
    },
  ]
  constructor() { }

  getQuestions() {
    return of(this.questions);
  }
}
