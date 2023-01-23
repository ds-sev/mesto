/* IMPORTS */
import './index.css';
import {initialCards} from '../components/initialCards.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

/*** ELEMENTS ***/
const profileEditButton = document.querySelector('.profile__button-edit'),
  nameInput = document.querySelector('.edit-form__field_get_name'),
  jobInput = document.querySelector('.edit-form__field_get_job'),
  profileEditForm = document.querySelector('#profile-edit-form'),
  buttonNewCard = document.querySelector('.profile__button-add'),
  popupNewCard = document.querySelector('#add-card-popup'),
  newCardForm = popupNewCard.querySelector('#add-card-form')

/*** SELECTORS ***/
const configValidation = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'edit-form__field_type_error',
  errorClass: 'edit-form__field_error_active',
}
const
  cardsSection = '.cards',
  cardTemplateSelector = '#card',
  imagePopupSelector = '.popup-image-view',
  newCardPopupSelector = '.popup-new-card',
  profileEditPopupSelector = '.popup-profile-edit',
  userNameSelector = '.profile__name',
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
const handleProfileEditFormSubmitData = (formData) => { userInfo.setUserInfo(formData); profileEditFormPopup.close() }
const profileEditFormPopup = new PopupWithForm(profileEditPopupSelector, handleProfileEditFormSubmitData)
profileEditFormPopup.setEventsListeners()


/* СОЗДАНИЕ НОВОЙ КАРТОЧКИ */
const newCardPopup = new PopupWithForm(newCardPopupSelector, handleSubmitAddCardForm)
newCardPopup.setEventsListeners()

function handleSubmitAddCardForm(formData) {
  const renderUserCard = new Section(
    {items: [{name: formData.place, link: formData.link}], renderer}, cardsSection)
  renderUserCard.renderItem()
  newCardPopup.close()
}

/* ОТКРЫТИЕ ФОРМЫ ДОБАВЛЕНИЯ НОВОГО МЕСТА + СБРОС ДАННЫХ ИЗ ПОЛЕЙ */
buttonNewCard.addEventListener('click', () => {
  newCardFormValidation.resetValidation();
  newCardPopup.open()
})

/* EXPORTS */
export {handleCardClick}
