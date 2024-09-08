export interface AnswerModel {
  questionId: number;
  answerText?: string;
  options?: {
    optionId: number;
    optionText: string;
  }[];
}
