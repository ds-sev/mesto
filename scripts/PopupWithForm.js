import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector)
    this._handleSubmitForm = handleSubmitForm
    this._formFields = this._popup.querySelectorAll('.edit-form__field')
  }

  _getInputValues() {
    this._inputValues = {}
    this._formFields.forEach((field) => {
      this._inputValues[field.name] = field.value;
    })
    return this._inputValues
  }

  setEventsListeners() {
    super.setEventsListeners()
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._getInputValues()
      this._handleSubmitForm(this._inputValues)
      this.close()
    })
  }

  close() {
    this._popup.querySelector('.edit-form').reset()
    super.close()
  }
}
