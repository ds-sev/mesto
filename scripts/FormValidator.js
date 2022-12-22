/* НАСТРОЙКА ВАЛИДАЦИИ ПОЛЕЙ ФОРМЫ */
class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._formElement = formElement;
    this._inputList = [...formElement.querySelectorAll(this._inputSelector)]
  }

  enableValidation() {
    this._setEventListeners()
  }

  /*  ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ ВВОДА */
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass)
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass)
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = ''
    errorElement.classList.remove(this._errorClass)
  }

  _toggleButtonState() {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    if (this._hasInvalidInput(this._inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass)
      buttonElement.disabled = true
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass)
      buttonElement.disabled = false
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  /* СБРОС ОШИБОК ПРИ ПОВТОРНОМ ОТКРЫТИИ */
  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input)
    })
    this._toggleButtonState()
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }
}

/* EXPORTS */
export {FormValidator}
