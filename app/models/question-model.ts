import {AnswerModel} from "./answer-model";

export interface QuestionModel{
  questionId: number;
  questionText: string;
  answer: AnswerModel;
}
