/* IMPORTS */
import './index.css';
import {initialCards} from '../utils/initialCards.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import * as constants from '../utils/constants.js'

/* ОТКРЫТИЕ ПОЛНОЭКРАННОГО ИЗОБРАЖЕНИЯ */
const imageViewPopup = new PopupWithImage(constants.imagePopupSelector)
imageViewPopup.setEventsListeners()
const handleCardClick = (link, name) => {
  imageViewPopup.open(link, name)
}

/* ФУНКЦИЯ ОТРИСОВКИ КАЖДОГО ОТДЕЛЬНОГО ЭЛЕМЕНТА */
const renderer = (cardData) => renderInitialCards.addCard(createCard(cardData))

/* СОЗДАНИЕ КАРТОЧКИ */
const createCard = (cardData) => {
  return new Card(cardData, constants.cardTemplateSelector, handleCardClick).generateCard()
}

/* ОТРИСОВКА ПРЕДЗАГРУЖЕННЫХ КАРТОЧЕК */
const renderInitialCards = new Section(
  {cardsData: initialCards, renderer}, constants.cardsSection)
renderInitialCards.renderItems();

/* СОЗДАНИЕ ЭКЗЕМПЛЯРА КЛАССА ВАЛИДАЦИИ ДЛЯ КАЖДОЙ ПРОВЕРЯЕМОЙ ФОРМЫ */
const profileFormValidation = new FormValidator(constants.configValidation, constants.profileEditForm);
profileFormValidation.enableValidation();

const newCardFormValidation = new FormValidator(constants.configValidation, constants.newCardForm);
newCardFormValidation.enableValidation();

/* ОТКРЫТИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ + ПЕРЕНОС ДАННЫХ СО СТРАНИЦЫ В ФОРМУ */
const userInfo = new UserInfo(constants.userNameSelector, constants.userAboutSelector)
constants.profileEditButton.addEventListener('click', () => {
  userInfo.getUserInfo()
  constants.nameInput.value = userInfo.getUserInfo().name
  constants.jobInput.value = userInfo.getUserInfo().job
  profileFormValidation.resetValidation()
  profileEditFormPopup.open()
})

/* ОТПРАВКА ДАННЫХ, ПОЛУЧЕННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
const handleProfileEditFormSubmitData = (formData) => { userInfo.setUserInfo(formData); profileEditFormPopup.close() }
const profileEditFormPopup = new PopupWithForm(constants.profileEditPopupSelector, handleProfileEditFormSubmitData)
profileEditFormPopup.setEventsListeners()


/* СОЗДАНИЕ НОВОЙ КАРТОЧКИ */
const newCardPopup = new PopupWithForm(constants.newCardPopupSelector, handleSubmitAddCardForm)
newCardPopup.setEventsListeners()

function handleSubmitAddCardForm(formData) {
  const renderUserCard = new Section(
    {cardsData: [{name: formData.place, link: formData.link}], renderer}, constants.cardsSection)
  renderUserCard.renderItems()
  newCardPopup.close()
}

/* ОТКРЫТИЕ ФОРМЫ ДОБАВЛЕНИЯ НОВОГО МЕСТА + СБРОС ДАННЫХ ИЗ ПОЛЕЙ */
constants.buttonNewCard.addEventListener('click', () => {
  newCardFormValidation.resetValidation();
  newCardPopup.open()
})

/* EXPORTS */
export {handleCardClick}
