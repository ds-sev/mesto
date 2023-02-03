/* IMPORTS */
import './index.css';
// import {initialCards} from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import * as constants from '../utils/constants.js';

import {api} from '../components/Api.js';

/** INSTANCES */
const userInfo = new UserInfo(constants.userNameSelector, constants.userAboutSelector)
const imageViewPopup = new PopupWithImage(constants.imagePopupSelector)
const profileEditFormPopup = new PopupWithForm(constants.profileEditPopupSelector, handleProfileEditFormSubmitData)
const newCardPopup = new PopupWithForm(constants.newCardPopupSelector, handleSubmitAddCardForm)
const profileFormValidation = new FormValidator(constants.configValidation, constants.profileEditForm);
const newCardFormValidation = new FormValidator(constants.configValidation, constants.newCardForm);
const cardSection = new Section(constants.cardsSection)

// add cards array from server to page
api.getInitialCards()
  .then(cardsData => cardsData.reverse().forEach(cardData => renderCard(cardData)))

api.getInitialCards()
  .then(cardsData => console.log(cardsData))

/** FUNCTIONS */

/** ФУНКЦИЯ ОТРИСОВКИ КАЖДОГО ОТДЕЛЬНОГО ЭЛЕМЕНТА */
function renderCard(cardData) {
  cardSection.addCard(createCard(cardData))
}





/* СОЗДАНИЕ КАРТОЧКИ */
const createCard = (cardData) => {
  return new Card(cardData, constants.cardTemplateSelector, handleCardClick).generateCard()
}







/* OPEN USER INFO FORM, RESET VALIDATION ERRORS AND PASTE USER INFORMATION FROM PAGE TO EDITING FORM */
function handleProfileEditFormOpen() {
  const userData = userInfo.getUserInfo()
  constants.nameInput.value = userData.name
  constants.jobInput.value = userData.job
  profileFormValidation.resetValidation()
  profileEditFormPopup.open()
}

/* ОТПРАВКА ДАННЫХ, ПОЛУЧЕННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
// function handleProfileEditFormSubmitData(formData) {
//   userInfo.setUserInfo(formData);
//   profileEditFormPopup.close()
// }



// send edited user info to server
function handleProfileEditFormSubmitData(formData) {
  api.setUserInfo(formData)
  userInfo.setUserInfo(formData);
  profileEditFormPopup.close()
}











function handleNewCardFormOpen() {
  newCardFormValidation.resetValidation();
  newCardPopup.open()
}

/* NEW CARD RENDER */
function handleSubmitAddCardForm(cardData) {
  api.postNewCard(cardData)
  renderCard(cardData)
  console.log(cardData)




  newCardPopup.close()
}

const handleCardClick = (link, name) => imageViewPopup.open(link, name)

profileFormValidation.enableValidation()
newCardFormValidation.enableValidation()
profileEditFormPopup.setEventsListeners()
// cardSection.renderItems();
newCardPopup.setEventsListeners()
imageViewPopup.setEventsListeners()

constants.buttonNewCard.addEventListener('click', handleNewCardFormOpen)
constants.profileEditButton.addEventListener('click', handleProfileEditFormOpen)





///////////////////////////////////

export const name = document.querySelector('.profile__name')
export const about = document.querySelector('.profile__about')
export const avatar = document.querySelector('.profile__photo')







/* EXPORTS */
export {handleCardClick}
