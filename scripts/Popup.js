export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
  }
  open() {
    document.querySelector(this._popupSelector);

  }
  close() {

  }
  _handleEscClose() {

  }
  setEventsListeners() {

  }
}
