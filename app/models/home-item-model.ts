export interface HomeItemModel {
  title: string;
  subTitle: string;
  description: string;
  date: Date | null;
  startTime: string;
  endTime: string;
  eventType: EventTypes;
  eventID: number | null;
  campaignID: number | null;
  surveyDone? : boolean | null;
}

export enum EventTypes {
  campaign = 1,
  shift = 2,
  training = 3,
  casting = 4,
}
