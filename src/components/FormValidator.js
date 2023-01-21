/* НАСТРОЙКА ВАЛИДАЦИИ ПОЛЕЙ ФОРМЫ */
class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._formElement = formElement;
    this._buttonSubmitElement = this._formElement.querySelector(this._submitButtonSelector)
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

  _showInputError(inputElement) {
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
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonSubmitElement.classList.add(this._inactiveButtonClass)
      this._buttonSubmitElement.disabled = true
    } else {
      this._buttonSubmitElement.classList.remove(this._inactiveButtonClass)
      this._buttonSubmitElement.disabled = false
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.some((input) => {
      return !input.validity.valid
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
    this._inputList = [...this._formElement.querySelectorAll(this._inputSelector)]
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
