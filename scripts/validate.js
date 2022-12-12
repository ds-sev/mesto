/* IMPORTS */
import {configValidation} from "./constants.js"

/* ФУНКЦИЯ ДОБАВЛЕНИЯ ОТОБРАЖЕНИЯ ОШИБКИ */
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);                                                  //добавляем класс для визуального отображения ошибки
  errorElement.textContent = errorMessage;                                                             //получаем текст стандартного сообщения об ошибке
  errorElement.classList.add(config.errorClass);                                                       //добавляем класс отображения названия ошибки
}

/* ФУНКЦИЯ УДАЛЕНИЯ ОТОБРАЖЕНИЯ ОШИБКИ */
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);                                               //удаляем класс отображения ошибки
  errorElement.classList.remove(config.errorClass);                                                    //удаляем класс отображения названия ошибки
  errorElement.textContent = '';
}

/*  ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ ВВОДА */
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {                                                                  //если true
    showInputError(formElement, inputElement, inputElement.validationMessage, config);                   //вызываем функцию отображения ошибки и передаем в неё аргументы формы и сообщ.
  } else {                                                                                             //если false
    hideInputError(formElement, inputElement, config);                                                   //скрываем отображение ошибки
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

/*  ПЕРЕКЛЮЧЕНИЕ АКТИВНОСТИ КНОПКИ ОТПРАВКИ ФОРМЫ */
const toggleButtonState = (formElement, inputList, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function enableValidation(config) {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config)
  })
}

/*  ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ ВВОДА */
const setEventListeners = (formElement, config) => {
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, config);
    })
  })
}

/* СБРОС ОШИБОК ВАЛИДАЦИИ */
const resetErrorMessages = (config) => {
  const errorMessages = [...document.querySelectorAll('.edit-form__field-error')];
  const errorFields = [...document.querySelectorAll('.edit-form__field')];
  errorMessages.forEach((errorItem) => errorItem.textContent = '');
  errorFields.forEach((errorField) => errorField.classList.remove(config.inputErrorClass));
}

/* ПРОВЕРКА ВАЛИДНОСТИ ДЛЯ СОСТОЯНИЯ КНОПКИ ПРИ ОТКРЫТИИ ФОРМЫ */
const startCheckForButton = (targetPopup, config) => {
  const formElement = targetPopup.querySelector(config.formSelector);
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  toggleButtonState(formElement, inputList, config)
}

enableValidation(configValidation)

/* EXPORTS */
export {resetErrorMessages}
export {startCheckForButton}
