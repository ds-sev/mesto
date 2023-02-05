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

import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
import {cardsSection} from '../utils/constants.js';


/** INSTANCES */
const userInfo = new UserInfo(constants.userNameSelector, constants.userAboutSelector)
const imageViewPopup = new PopupWithImage(constants.imagePopupSelector)
const profileEditFormPopup = new PopupWithForm(constants.profileEditPopupSelector, handleProfileEditFormSubmitData)
const newCardPopup = new PopupWithForm(constants.newCardPopupSelector, handleSubmitAddCardForm)
const profileFormValidation = new FormValidator(constants.configValidation, constants.profileEditForm);
const newCardFormValidation = new FormValidator(constants.configValidation, constants.newCardForm);


const confirmationPopupSelector = '.popup-del-card'

// get user info from server
api.getUserInfo()
  .then((result) => {
    name.textContent = result.name
    about.textContent = result.about
    avatar.src = result.avatar
    userId.textContent = result._id
  })

// add cards array from server to page and hide del-icon for other users cards
api.getInitialCards()
  .then(cardsData => cardSection.renderItems(cardsData))
  .catch(err => console.log(err))

/** FUNCTIONS */

/** ФУНКЦИЯ ОТРИСОВКИ КАЖДОГО ОТДЕЛЬНОГО ЭЛЕМЕНТА */


const renderCard = (cardData) => {
  cardSection.addCard(createCard(cardData))
}
const cardSection = new Section(constants.cardsSection, renderCard)


const createCard = (cardData) => {
  const card =  new Card(cardData, constants.cardTemplateSelector, handleCardClick,
    {
      handleCardDelete: (cardToDel) => {
        deleteCardConfirmation.open()
        deleteCardConfirmation.handleSubmitConfirmation(() => {
          console.log(cardToDel)
          api.deleteCard(cardData._id)
            // .then(() => console.log(cardData))
            .then(() => {
              card.handleRemoveItem()
              deleteCardConfirmation.close()
            })
            .catch(err => console.log(err))
        })

      }
    })
    return card.generateCard()
}





// const handleCardDelete = (cardData) => {
//   deleteCardConfirmation.open()
//   deleteCardConfirmation.handleSubmitConfirmation(() => {
//     console.log(cardData)
//     api.deleteCard(cardData._id)
//       .then(() => console.log(cardData))
//       .then(() => card.handleRemoveItem())
//       .then(() => deleteCardConfirmation.close())
//   })
// }



// api.deleteCard(cardData)
//   .then(() => card.handleRemoveItem)

//
// const handleConfirm = (card) => {
//   const initialCard = card
// }








//
const deleteCardConfirmation = new PopupWithConfirmation(confirmationPopupSelector)
//
// const deleteButton = document.querySelector('.card__button-delete')
// // deleteButton.addEventListener('click', () => console.log(';bjnj'))

deleteCardConfirmation.setEventsListeners()


/* СОЗДАНИЕ КАРТОЧКИ */








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
  newCardPopup.close()
  api.getInitialCards()
    .catch(err => console.log(err))
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
export const userId = document.querySelector('.profile__id')










/* EXPORTS */
export {handleCardClick}
