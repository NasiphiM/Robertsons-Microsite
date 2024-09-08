import { Component, OnInit } from '@angular/core';
import {QuestionModel} from "../models/question-model";
import {Router} from "@angular/router";
import {QuestionService} from "../services/question.service";
import {AnswerModel} from "../models/answer-model";
import {AnswerService} from "../services/answer.service";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {
  questions: QuestionModel[] = [];
  currQuestion: number = 0;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
  ) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(q => {
      this.questions = q;
      this.currQuestion = 1;
    });
  }

  ionViewWillEnter(){
    this.answerService.startNewAnswer();
    this.currQuestion = 1;
    this.questions.forEach(q => {
      q.answer = {
        questionId: q.answer.questionId,
        answerText: '',
        options: q.answer.options
      }
    });
  }

}
