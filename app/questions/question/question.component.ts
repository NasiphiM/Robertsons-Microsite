import {Component, Input, OnInit} from '@angular/core';
import {QuestionModel} from "../../models/question-model";
import {AnswerModel} from "../../models/answer-model";
import {Router} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import {AnswerService} from "../../services/answer.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Constants} from "../../constants";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  get question(): QuestionModel | null {
    return this._question;
  }

  questions: QuestionModel[] = [];
  private _question: QuestionModel | null = null;
  isAnswered: boolean = false;
  currQuestion: number = 1;
  index: number = 0;
  private selectedAnswerOption: AnswerModel | null = null;

  @Input() set question(value: QuestionModel | null) {
    this._question = value;
    this.isAnswered = false;
    this.selectedAnswerOption = null;
  }

  constructor(
    private route: Router,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(q => {
      this.questions = q;
      this.questions.forEach(q => {
        q.answer = {
          questionId: q.answer.questionId,
          answerText: '',
          options: q.answer.options
        }
      });
      this.currQuestion = 1;
    });
  }

  onSelected(answer: string, x: number) {
    this.isAnswered = true;
    this.index = x;
    this.questions[this.currQuestion - 1].answer.answerText = answer;
  }

  getQuestion(qNum: number) {
    this._question = this.questions[qNum - 1];
  }

  prevQuestion() {
    this.currQuestion--;
    this.getQuestion(this.currQuestion);
  }

  nextQuestion() {
    let model: AnswerModel = {
      questionId: this.questions[this.currQuestion - 1].answer.questionId,
      answerText: this.questions[this.currQuestion - 1].answer.answerText,
      options: this.questions[this.currQuestion - 1].answer.options
    }

    if (this.currQuestion) {
      this.answerService.addAnswer({
        questionId: this.questions[this.currQuestion - 1].answer.questionId,
        answerText: this.questions[this.currQuestion - 1].answer.answerText
      });
    }

    if (this.questions[this.currQuestion - 1].questionId == 1 && this.questions[this.currQuestion - 1].answer.answerText?.toLowerCase() == "no") {
      Constants.showAlert(this.alertCtrl, "Sorry", "You must be 18 years or older to enter.");
      this.route.navigate(['/home']);
    }

    if (this.questions[this.currQuestion - 1].questionId == 2 && this.questions[this.currQuestion - 1].answer.answerText?.toLowerCase() == "no") {
      Constants.showAlert(this.alertCtrl, "Sorry", "You must have purchased 2 or more Robertsons Spices to enter.");
      this.route.navigate(['/home']);
    }

    if (this.currQuestion == this.questions.length) {
      this.loadingCtrl.create({message: 'Saving ...'})
        .then(loading => {
          loading.present();
          this.answerService.saveAnswers(model).subscribe({
            next: result => {
              this.route.navigate(['/thank-you']).then(r => loading.dismiss());
            },
            error: err => {
              Constants.showAlert(this.alertCtrl, "Error", Constants.getHttpErrorMessage(err) ?? "An error occurred");
              console.error(err);
              loading.dismiss();
            }
          });
        });
    } else {
      this.currQuestion++;
      this.getQuestion(this.currQuestion);
    }

  }


}
