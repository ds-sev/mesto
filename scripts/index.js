/* IMPORTS */
import {initialCards} from './initialCards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js'

import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
/*** CONST`S ***/

/* ПОЛЯ ПРОФИЛЯ НА СТРАНИЦЕ */
const nameOnPage = document.querySelector('.profile__name');                                 //отображаемое на сайте имя
const jobOnPage = document.querySelector('.profile__about');                                 //отображаемое на сайте занятие
/* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const profileEditButton = document.querySelector('.profile__button-edit'),                   //кнопка редактирования профиля
  // profileEditPopup = document.querySelector('#profile-edit-popup'),                          //форма редактирования профиля
  nameInput = document.querySelector('.edit-form__field_get_name'),                          //значения поля имени в форме
  jobInput = document.querySelector('.edit-form__field_get_job'),                            //значение поля ввода занятия в форме
  profilePopupButtonClose = document.querySelector('#profile-edit-form-button-close'),       //кнопка закрытия формы редактирования профиля
  profileEditForm = document.querySelector('#profile-edit-form');
/* ДОБАВЛЕНИЕ МЕСТА */
const buttonNewCard = document.querySelector('.profile__button-add'),                         //кнопка добавления новой карточки
  popupNewCard = document.querySelector('#add-card-popup'),                                   //форма добавления нового места
  cardPopupButtonClose = document.querySelector('#add-card-form-button-close');               //кнопка закрытия формы добавления нового места
/* ПРОСМОТР ИЗОБРАЖЕНИЯ */
// const imageViewPopup = document.querySelector('#image-view-popup'),
const imageViewItem = document.querySelector('.image-view__item'),
  imageViewTitle = document.querySelector('.image-view__title'),
  imageViewCloseButton = document.querySelector('#image-view-button-close');
/* ДАННЫЕ КАРТОЧЕК */
const cardsSection = '.cards',
  newCardForm = popupNewCard.querySelector('#add-card-form'),
  placeInput = popupNewCard.querySelector('.edit-form__field_get_place-name'),                //значения поля ввода названия места
  linkInput = popupNewCard.querySelector('.edit-form__field_get_link');
/* ПОПАПЫ */
const popupList = [...document.querySelectorAll('.popup')];

const cardTemplateSelector = '#card';

const configValidation = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'edit-form__field_type_error',
  errorClass: 'edit-form__field_error_active',
}

/*** FUNCTIONS ***/
const imagePopupSelector = '.popup-image-view'
const newCardPopupSelector = '.popup-new-card'
const profileEditPopupSelector = '.popup-profile-edit'

/* ОТКРЫТИЕ ПОЛНОЭКРАННОГО ИЗОБРАЖЕНИЯ */
const handleImageClick = (link, name) => {
  const imageViewPopup = new PopupWithImage(imagePopupSelector)
  imageViewPopup.open(link, name)
  imageViewPopup.setEventsListeners()
}

/* ФУНКЦИЯ ОТРИСОВКИ КАЖДОГО ОТДЕЛЬНОГО ЭЛЕМЕНТА */
const renderer = (item) => renderInitialCards.addItem(createCard(item))


/* СОЗДАНИЕ КАРТОЧКИ */
const createCard = (cardData) => {
  return new Card(cardData, cardTemplateSelector, handleImageClick).generateCard()
}

/* ОТРИСОВКА ПРЕДЗАГРУЖЕННЫХ КАРТОЧЕК */
const renderInitialCards = new Section(
  {items: initialCards, renderer}, cardsSection)
renderInitialCards.renderItem();

/* СОЗДАНИЕ ЭКЗЕМПЛЯРА КЛАССА ВАЛИДАЦИИ ДЛЯ КАЖДОЙ ПРОВЕРЯЕМОЙ ФОРМЫ */
const profileFormValidation = new FormValidator(configValidation, profileEditForm);
profileFormValidation.enableValidation();

const newCardFormValidation = new FormValidator(configValidation, newCardForm);
newCardFormValidation.enableValidation();

/* ОТКРЫТИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ + ПЕРЕНОС ДАННЫХ СО СТРАНИЦЫ В ФОРМУ */
profileEditButton.addEventListener('click', () => {
  nameInput.value = nameOnPage.textContent;
  jobInput.value = jobOnPage.textContent;
  profileFormValidation.resetValidation()
  profileEditFormPopup.open();
  profileEditFormPopup.setEventsListeners()
})

const profileEditFormPopup = new PopupWithForm(profileEditPopupSelector, handleProfileEditFormSubmitData)

/* ОТПРАВКА ДАННЫХ, ПОЛУЧЕННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleProfileEditFormSubmitData(formData) {
  nameOnPage.textContent = formData.name;
  jobOnPage.textContent = formData.job;
}

/* СОЗДАНИЕ НОВОЙ КАРТОЧКИ */
const newCardPopup = new PopupWithForm(newCardPopupSelector, handleSubmitAddCardForm);
function handleSubmitAddCardForm(formData) {
  const renderUserCard = new Section(
    {items: [{name: formData.place, link: formData.link}], renderer}, cardsSection)
  renderUserCard.renderItem();

}

/* ОТКРЫТИЕ ФОРМЫ ДОБАВЛЕНИЯ НОВОГО МЕСТА + СБРОС ДАННЫХ ИЗ ПОЛЕЙ */
buttonNewCard.addEventListener('click', () => {
  newCardFormValidation.resetValidation();
  newCardPopup.open()
  newCardPopup.setEventsListeners()
})

/* EXPORTS */
export {handleImageClick}
