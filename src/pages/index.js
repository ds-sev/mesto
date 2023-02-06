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

import {Api} from '../components/Api.js';

import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';





/** INSTANCES */
const userInfo = new UserInfo(constants.userNameSelector,
  constants.userAboutSelector,
  constants.avatarSelector)
const imageViewPopup = new PopupWithImage(constants.imagePopupSelector)
const profileEditFormPopup = new PopupWithForm(constants.profileEditPopupSelector, handleProfileEditFormSubmitData)
const newCardPopup = new PopupWithForm(constants.newCardPopupSelector, handleSubmitAddCardForm)
const profileFormValidation = new FormValidator(constants.configValidation, constants.profileEditForm);
const newCardFormValidation = new FormValidator(constants.configValidation, constants.newCardForm);




const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {authorization: 'c4ab66aa-531d-4641-bb6a-e0dfe4dabae8',
    'Content-Type': 'application/json'
  }
})


// get info about user and cards from server and render it on page
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData)
    cardSection.renderItems(cardsData)
    // console.log(userData._id)
    // console.log(userInfo.getUserId())
  })
  .catch(err => console.log(err))

/** FUNCTIONS */

/** ФУНКЦИЯ ОТРИСОВКИ КАЖДОГО ОТДЕЛЬНОГО ЭЛЕМЕНТА */


const renderCard = (cardData) => {
  cardSection.addCard(createCard(cardData))
}
const cardSection = new Section(constants.cardsSection, renderCard)





const createCard = (cardData) => {
  const card =  new Card(cardData, userInfo.getUserId(), constants.cardTemplateSelector, handleCardClick,
    {
      handleCardDelete: (cardToDel) => {
        deleteCardConfirmation.open()
        deleteCardConfirmation.handleSubmitConfirmation(() => {
          console.log(cardToDel)
          api.deleteCard(cardData._id)
            .catch(err => console.log(err))
          card.handleRemoveItem()
          deleteCardConfirmation.close()
        })
      },
    handleCardReaction: (cardToReaction) => {
        if (card.isCardLiked() !== true) {
          api.putLike(cardToReaction._id)
            .then(res => {
              card.likesCounter(res.likes)
              // card.likesQty()
            })
            .catch(err => console.log(err))
        } else {
          api.deleteLike(cardToReaction._id)
            .then(res => {
              card.likesCounter(res.likes)
              // card.likesQty()
            })
            .catch(err => console.log(err))
        }
    }
    })
    return card.generateCard()
}



// function handleCardLike(cardToLike) {
//   api.putLike(cardToLike)
//
//     .catch(err => console.log(err))
// }
//
// function handleCardUnlike(cardToUnlike) {
//   api.deleteLike(cardToUnlike)
//     .catch(err => console.log(err))
// }



function handleCardDelete(cardToDel) {

}







const deleteCardConfirmation = new PopupWithConfirmation(constants.confirmationPopupSelector)
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



// send edited user info to server
function handleProfileEditFormSubmitData(formData) {
  api.setUserInfo(formData)
    .then(res => res.json())
    .then(data => {
      userInfo.setUserInfo(data)
      profileEditFormPopup.close()
    })
    .catch(err => console.log(err))
}



function handleNewCardFormOpen() {
  newCardFormValidation.resetValidation();
  newCardPopup.open()
}

/* NEW CARD RENDER */
function handleSubmitAddCardForm(cardData) {
  api.postNewCard(cardData)
    .then(res => res.json())
    .then(data => {
      renderCard(data)
      newCardPopup.close()
    })
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

export const likesCounter = document.querySelector('.likes-container__counter')

// api.getInitialCards()
//   .then(res => console.log(res))

/* EXPORTS */
export {handleCardClick}



