import {Popup} from './Popup.js';
import {api} from './Api';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popup = document.querySelector(popupSelector)

  }
  open() {
    super.open();



  }

  handleRemoveItem = () => {
    this._card.remove()
    this._card = null
  }

  handleSubmitConfirmation(submit) {
    this._handleSubmitConfirmation = submit
  }

  // changeButtonText() {
  //
  // }



  setEventsListeners() {
    super.setEventsListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitConfirmation()
    })
  }
}
