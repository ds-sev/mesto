/* ФУНКЦИЯ ДОБАВЛЕНИЕ ОТОБРАЖЕНИЯ ОШИБКИ */
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('edit-form__field_type_error');                                           //добавляем класс для визуального отображения ошибки
  errorElement.textContent = errorMessage;                                                             //получаем текст стандартного сообщения об ошибке
  errorElement.classList.add('edit-form__field_error_active');                                         //добавляем класс отображения названия ошибки
}

/* ФУНКЦИЯ УДАЛЕНИЯ ОТОБРАЖЕНИЯ ОШИБКИ */
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('edit-form__field_type_error');                                //удаляем класс отображения ошибки
  errorElement.classList.remove('edit-form__field_error_active');                              //удаляем класс отображения названия ошибки
  errorElement.textContent = '';
}

/*  ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ ВВОДА */
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {                                                                  //если true
    showInputError(formElement, inputElement, inputElement.validationMessage);                         //вызываем функцию отображения ошибки и передаем в неё аргументы формы и сообщ.
  } else {                                                                                             //если false
    hideInputError(formElement, inputElement);                                                         //скрываем отображение ошибки
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

/*  ПЕРЕКЛЮЧЕНИЕ АКТИВНОСТИ КНОПКИ ОТПРАВКИ ФОРМЫ */
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
    // buttonElement.disabled = true;
    buttonElement.type = 'button';


  } else {
    buttonElement.classList.remove('button_inactive');
    // buttonElement.disabled = false;
    buttonElement.type = 'submit';

  }
}

/*  ПРОВЕРКА ВАЛИДНОСТИ ПОЛЯ ВВОДА */
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.edit-form__field'));
  const buttonElement = formElement.querySelector('.button_submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.edit-form'));                          //создаем массив из всех форм на странице
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(document.querySelectorAll('.edit-form__fields'));            //В каждом эл.-та массива с формами находим поля ввода
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
}

/* СБРОС ВСЕХ ОШИБОК ВАЛИДАЦИИ */
const resetErrorMessages = () => {
  const errorMessages = [...document.querySelectorAll('.edit-form__field-error')];
  const errorFields = [...document.querySelectorAll('.edit-form__field')]
  errorMessages.forEach((errorItem) => {
    errorItem.textContent = '';
  });
  errorFields.forEach((errorField) => {
    errorField.classList.remove('edit-form__field_type_error');
  })
}



//   enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });
//
// console.log(enableValidation);

export {enableValidation, resetErrorMessages};
