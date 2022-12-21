/* НАСТРОЙКА ВАЛИДАЦИИ ПОЛЕЙ ФОРМЫ */
class FormValidator {
  constructor(formElement) {
    this._configValidation = {
      formSelector: '.edit-form',
      inputSelector: '.edit-form__field',
      submitButtonSelector: '.button_submit',
      inactiveButtonClass: 'button_inactive',
      inputErrorClass: 'edit-form__field_type_error',
      errorClass: 'edit-form__field_error_active',
    }
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault())
    this._setEventListeners()
  }

  _setEventListeners() {
    const inputList = [...this._formElement.querySelectorAll(this._configValidation.inputSelector)]
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(inputList)
      })
    })
  }
  /*  ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ ВВОДА */
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._configValidation.inputErrorClass)
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(this._configValidation.errorClass)
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._configValidation.inputErrorClass)
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = ''
    errorElement.classList.remove(this._configValidation.errorClass)
  }

  _toggleButtonState(inputList) {
    const buttonElement = this._formElement.querySelector(this._configValidation.submitButtonSelector)
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._configValidation.inactiveButtonClass)
      buttonElement.disabled = true
    } else {
      buttonElement.classList.remove(this._configValidation.inactiveButtonClass)
      buttonElement.disabled = false
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  /* СОСТОЯНИЕ ПОЛЕЙ И КНОПОК ПРИ ОТКРЫТИИ ФОРМ */
  //сброс ошибок полей
  _resetErrorMessages() {
    const errorMessages = [...this._formElement.querySelectorAll('.edit-form__field-error')]
    const errorFields = [...this._formElement.querySelectorAll('.edit-form__field')]
    errorMessages.forEach((errorItem) => errorItem.textContent = '')
    errorFields.forEach((errorField) => errorField.classList.remove(this._configValidation.inputErrorClass));
  }
  //обновление состояния кнопки
  _buttonStateAtOpen() {
    const inputList = [...this._formElement.querySelectorAll(this._configValidation.inputSelector)]
    this._toggleButtonState(inputList)
  }
}

/* EXPORTS */
export {FormValidator}
