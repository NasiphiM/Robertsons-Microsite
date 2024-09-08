import {AbstractControl, FormGroup, NgForm} from "@angular/forms";
import {AlertController} from "@ionic/angular";

export class Constants{
  public static defaultTextAreaLength = 1000;
  public static noServiceError =
    'Your internet is currently offline/disconnected. Please check your settings, or try again later.';
  public static commentSizeError =
    'Summarize your comment to be under 1000 characters';
  private static emailRegEx = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
  );

  public static getInvalidControls(formBase: NgForm): AbstractControl<any, any>[] {
    const invalid = [];
    const controls = formBase.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(controls[name]);
      }
    }
    return invalid;
  }

  public static config: { [name: string]: {
      campaignId: number,
      questionnaireId: number,
      questionnaireSectionId: number,
      shiftId: number,
      individualID: number,
      questionIds: { [name: string]:number}
    }} =
    {
      'robertsons' : {
        campaignId: 5158,
        questionnaireId: 3612,
        questionnaireSectionId: 11133,
        shiftId: 2569151,
        individualID: 44846,
        questionIds: {
          name: 57127,
          contactNumber: 57128,
          emailAddress: 57129,
          consent: 57130
        }
      },
    }

  public static getHttpErrorMessage(err: any): string | null {
    if (err.status === 0) {
      return this.noServiceError;
    } else if (err.status === 401) {
      return 'Not Authorized';
    } else if (err.status === 413) {
      return 'File too large';
    } else if (typeof err === 'string') {
      return err;
    } else if (err.error && (typeof err.error === 'string' || err.error.text)) {
      if (typeof err.error === 'string') {
        return err.error;
      } else if (err.error.text) {
        return err.error.text;
      }
    } else if (err.statusText) {
      return err.statusText;
    } else if (typeof err === 'object') {
      return JSON.stringify(err);
    } else if (err) {
      return err.toString();
    }
    return null;
  }

  static showInvalidControls(form: NgForm, alertCtrl: AlertController, customControlChecker?: (formBase: NgForm) => AbstractControl<any, any>[]) {
    let invalidControls: AbstractControl<any, any>[] = [];
    if (customControlChecker) {
      invalidControls = customControlChecker(form);
    } else {
      invalidControls = Constants.getInvalidControls(form);
    }


    if (invalidControls) {
      invalidControls.forEach((ctrl) => {
        if (ctrl instanceof FormGroup) {
          const tempGroup = ctrl as FormGroup;
          for (const control in tempGroup.controls) {
            tempGroup.controls[control].markAsTouched();
          }
        }
        ctrl.markAsTouched();
      });
    }
    alertCtrl
      .create({
        header: 'Incorrect Values',
        message:
          'The form is not correctly filled out, please check the form for details.',
        buttons: [
          {
            text: 'Okay',
            role: 'cancel',
          },
        ],
      })
      .then((alertEL) => alertEL.present());
  }

  public static showAlert(alertCtrl: AlertController, header: string, message: string) {
    alertCtrl
      .create({
        header,
        message,
        buttons: [
          {
            text: 'Okay',
            role: 'Cancel',
          },
        ],
      })
      .then((alertEL) => alertEL.present());
  }



}
