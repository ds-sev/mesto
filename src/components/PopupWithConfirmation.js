import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    super.open();
  }

  handleSubmitConfirmation(submit) {
    this._handleSubmitConfirmation = submit
  }

  setEventsListeners() {
    super.setEventsListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitConfirmation()
    })
  }
}
