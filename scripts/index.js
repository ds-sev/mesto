import {initialCards} from './cards.js';
/* ПОЛЯ ПРОФИЛЯ НА СТРАНИЦЕ */
const nameOnPage = document.querySelector('.profile__name');                                  //отображаемое на сайте имя
const jobOnPage = document.querySelector('.profile__about');                                  //отображаемое на сайте занятие
/* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const profileEditButton = document.querySelector('.profile__button-edit'),                    //кнопка редактирования профиля
  profileEditPopup = document.querySelector('#profile-edit-popup'),                       //форма редактирования профиля
  nameInput = document.querySelector('.edit-form__field_get_name'),                       //значения поля имени в форме
  jobInput = document.querySelector('.edit-form__field_get_job'),                         //значение поля ввода занятия в форме
  profilePopupButtonClose = document.querySelector('#profile-edit-form-button-close'),    //кнопка закрытия формы редактирования профиля
  profileEditForm = document.querySelector('#profile-edit-form');
/* ДОБАВЛЕНИЕ МЕСТА */
const cardTemplate = document.querySelector('#card').content.querySelector('.card'), //доступ к содержимому template для новой карточки
  buttonNewCard = document.querySelector('.profile__button-add'),                         //кнопка добавления новой карточки
  popupNewCard = document.querySelector('#add-card-popup'),                               //форма добавления нового места
  cardPopupButtonClose = document.querySelector('#add-card-form-button-close');           //кнопка закрытия формы добавления нового места
/* ПРОСМОТР ИЗОБРАЖЕНИЯ */
const imageViewPopup = document.querySelector('#image-view-popup'),
  imageViewItem = document.querySelector('.image-view__item'),
  imageViewTitle = document.querySelector('.image-view__title'),
  imageViewCloseButton = document.querySelector('#image-view-button-close');
/* ДАННЫЕ КАРТОЧЕК */
const cardsSection = document.querySelector('.cards'),
  newCardForm = popupNewCard.querySelector('#add-card-form'),
  placeInput = popupNewCard.querySelector('.edit-form__field_get_place-name'),                             //значения поля ввода названия места
  linkInput = popupNewCard.querySelector('.edit-form__field_get_link');

/* ОТКРЫТИЕ ПОПАПОВ */
function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
}

/* ЗАКРЫТИЕ ПОПАПОВ */
function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
  targetPopup = null;
}

/* ОТКРЫТИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ + ПЕРЕНОС ДАННЫХ СО СТРАНИЦЫ В ФОРМУ */
profileEditButton.addEventListener('click', () => {
  nameInput.value = nameOnPage.textContent;
  jobInput.value = jobOnPage.textContent;
  openPopup(profileEditPopup);
  enableValidation();
});
/* ОТКРЫТИЕ ФОРМЫ ДОБАВЛЕНИЯ НОВОГО МЕСТА + СБРОС ДАННЫХ ИЗ ПОЛЕЙ */
buttonNewCard.addEventListener('click', () => {
  newCardForm.reset();
  openPopup(popupNewCard);
  enableValidation();
});

profilePopupButtonClose.addEventListener('click', () => {
  closePopup(profileEditPopup)
});
cardPopupButtonClose.addEventListener('click', () => {
  closePopup(popupNewCard)
});
imageViewCloseButton.addEventListener('click', () => {
  closePopup(imageViewPopup)
});

/* ОТПРАВКА ДАННЫХ, ПОЛУЧЕННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleProfileEditFormSubmitData(evt) {
  evt.preventDefault();
  nameOnPage.textContent = nameInput.value;
  jobOnPage.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

profileEditForm.addEventListener('submit', handleProfileEditFormSubmitData);

/* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ В РАЗМЕТКУ */
const handleSubmitAddCardForm = (event) => {
  event.preventDefault();
  renderCard(cardsSection, {name: placeInput.value, link: linkInput.value});
  closePopup(popupNewCard);
}
newCardForm.addEventListener('submit', handleSubmitAddCardForm);

/* УДАЛЕНИЕ КАРТОЧКИ */
const handleTargetCardDelete = (evt) => {
  evt.target.closest('.card').remove()
}
/* ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ */
const generateCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__photo-container');
  cardName.textContent = cardData.name;
  cardLink.style.backgroundImage = `url(${cardData.link})`;
  //функция переключения активности Лайков
  const likeButton = cardElement.querySelector('#card__button-like');
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('card__button-like_active');
  });
  const deleteCardButton = cardElement.querySelector('#card-button-delete');
  deleteCardButton.addEventListener('click', handleTargetCardDelete);
  //просмотр полноэкранного изображения выбранной карточки
  const imageCard = cardElement.querySelector('#image-card');
  imageCard.addEventListener('click', () => {
    imageViewItem.src = cardData.link;
    imageViewTitle.textContent = cardName.textContent;
    imageViewItem.alt = 'На фото: ' + cardName.textContent;
    openPopup(imageViewPopup);
  });
  return cardElement;
}

/* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ В РАЗМЕТКУ */
const renderCard = (section, cardData) => {
  section.prepend(generateCard(cardData));
}

/* ПЕРЕБОР МАССИВА ПРЕДЗАГРУЖЕННЫХ КАРТОЧКЕК И ПЕРЕДАЧА КАЖДОГО ЭЛЕМЕНТА В ФУНКЦИЮ СОЗДАНИЯ НОВОЙ КАРТОЧКИ */
initialCards.slice().reverse()
  .forEach((initialCardData) => {
    renderCard(cardsSection, initialCardData);
  });


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


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
      console.log(inputList);
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

enableValidation();


//const hasInvalidInput =

// const enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });
//
// console.log(enableValidation);

