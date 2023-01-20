/* IMPORTS */
import './index.css';

import {initialCards} from '../components/initialCards.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'

import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
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


// const nameInput = '.edit-form__field_get_name',                          //значения поля имени в форме

const userNameSelector = '.profile__name',                              //отображаемое на сайте имя
  userAboutSelector = '.profile__about'


/* ОТКРЫТИЕ ПОЛНОЭКРАННОГО ИЗОБРАЖЕНИЯ */
const imageViewPopup = new PopupWithImage(imagePopupSelector)
imageViewPopup.setEventsListeners()
const handleCardClick = (link, name) => {
  imageViewPopup.open(link, name)
}

/* ФУНКЦИЯ ОТРИСОВКИ КАЖДОГО ОТДЕЛЬНОГО ЭЛЕМЕНТА */
const renderer = (item) => renderInitialCards.addItem(createCard(item))

/* СОЗДАНИЕ КАРТОЧКИ */
const createCard = (cardData) => {
  return new Card(cardData, cardTemplateSelector, handleCardClick).generateCard()
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
const userInfo = new UserInfo(userNameSelector, userAboutSelector)
profileEditButton.addEventListener('click', () => {
  userInfo.getUserInfo()
  nameInput.value = userInfo.getUserInfo().name
  jobInput.value = userInfo.getUserInfo().job
  profileFormValidation.resetValidation()
  profileEditFormPopup.open()
})

/* ОТПРАВКА ДАННЫХ, ПОЛУЧЕННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
const handleProfileEditFormSubmitData = (formData) => userInfo.setUserInfo(formData)

const profileEditFormPopup = new PopupWithForm(profileEditPopupSelector, handleProfileEditFormSubmitData)
profileEditFormPopup.setEventsListeners()

/* СОЗДАНИЕ НОВОЙ КАРТОЧКИ */
const newCardPopup = new PopupWithForm(newCardPopupSelector, handleSubmitAddCardForm)
newCardPopup.setEventsListeners()

function handleSubmitAddCardForm(formData) {
  const renderUserCard = new Section(
    {items: [{name: formData.place, link: formData.link}], renderer}, cardsSection)
  renderUserCard.renderItem();

}

/* ОТКРЫТИЕ ФОРМЫ ДОБАВЛЕНИЯ НОВОГО МЕСТА + СБРОС ДАННЫХ ИЗ ПОЛЕЙ */
buttonNewCard.addEventListener('click', () => {
  newCardFormValidation.resetValidation();
  newCardPopup.open()
})

/* EXPORTS */
export {handleCardClick}
