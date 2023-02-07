/* IMPORTS */
import './index.css';
import * as constants from '../utils/constants.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation.js';
import {Api} from '../components/Api.js';

/** INSTANCES */
const userInfo = new UserInfo(constants.userNameSelector,
  constants.userAboutSelector,
  constants.avatarSelector)
const imageViewPopup = new PopupWithImage(constants.imagePopupSelector)
const profileEditFormPopup = new PopupWithForm(constants.profileEditPopupSelector, handleProfileEditFormSubmitData)
const newCardPopup = new PopupWithForm(constants.newCardPopupSelector, handleSubmitAddCardForm)
const updateAvatarForm = new PopupWithForm(constants.avatarUpdatePopupSelector, handleSubmitUpdAvatarForm)
const deleteCardConfirmation = new PopupWithConfirmation(constants.confirmationPopupSelector)
const profileFormValidation = new FormValidator(constants.configValidation, constants.profileEditForm)
const newCardFormValidation = new FormValidator(constants.configValidation, constants.newCardForm)
const cardSection = new Section(constants.cardsSection, renderCard)
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
  })
  .catch(err => console.log(err))

/** FUNCTIONS */
function renderCard(cardData) {cardSection.addCard(createCard(cardData))}

const createCard = (cardData) => {
  const card = new Card(cardData, userInfo.getUserId(), constants.cardTemplateSelector, handleCardClick,
    {
      handleCardDelete: () => {
        deleteCardConfirmation.open()
        deleteCardConfirmation.handleSubmitConfirmation(() => {
          deleteCardConfirmation.handleDataSending(true, 'Удаление...')
            setTimeout(() => {
              api.deleteCard(cardData._id)
                .catch(err => console.log(err))
              deleteCardConfirmation.handleDataSending(true, 'Да')
              card.handleRemoveItem()
              deleteCardConfirmation.close()
            }, 500)
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
      },
    })
  return card.generateCard()
}

/* OPEN USER INFO FORM, RESET VALIDATION ERRORS AND PASTE USER INFORMATION FROM PAGE TO EDITING FORM */
function handleProfileEditFormOpen() {
  const userData = userInfo.getUserInfo()
  constants.nameInput.value = userData.name
  constants.jobInput.value = userData.job
  profileFormValidation.resetValidation()
  profileEditFormPopup.open()
}

// send edited user info to server
function handleProfileEditFormSubmitData(formData) {
  profileEditFormPopup.handleDataSending(true, 'Сохранение...')
  setTimeout(() => {
    api.setUserInfo(formData)
      .then(res => res.json())
      .then(data => {
        userInfo.setUserInfo(data)
        profileEditFormPopup.close()
      })
      .catch(err => console.log(err))
      .finally(() => profileEditFormPopup.handleDataSending(true, 'Сохранить'))
  }, 500)
}

function handleNewCardFormOpen() {
  newCardFormValidation.resetValidation();
  newCardPopup.open()
}
/* NEW CARD RENDER */
function handleSubmitAddCardForm(cardData) {
  newCardPopup.handleDataSending(true, 'Создание...')
  setTimeout(() => {
  api.postNewCard(cardData)
    .then(res => res.json())
    .then(data => {
      renderCard(data)
      newCardPopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => newCardPopup.handleDataSending(false, 'Создать'))
  }, 300)
}

const handleCardClick = (link, name) => imageViewPopup.open(link, name)

// update avatar
const handleUpdateAvatarFormOpen = () => updateAvatarForm.open()
// send link to new avatar to server and view it on page if verification.ok
function handleSubmitUpdAvatarForm(link) {
  updateAvatarForm.handleDataSending(true, 'Сохранение...')
  api.newAvatar(link.link)
    .then(data => {
      userInfo.setUserInfo(data)
      updateAvatarForm.close()
    })
    .catch(err => alert(err))
    .finally(() => updateAvatarForm.handleDataSending(false, 'Сохранить'))
}

profileFormValidation.enableValidation()
newCardFormValidation.enableValidation()
profileEditFormPopup.setEventsListeners()
deleteCardConfirmation.setEventsListeners()
newCardPopup.setEventsListeners()
imageViewPopup.setEventsListeners()
updateAvatarForm.setEventsListeners()
constants.buttonNewCard.addEventListener('click', handleNewCardFormOpen)
constants.profileEditButton.addEventListener('click', handleProfileEditFormOpen)
constants.avatarUpdateButton.addEventListener('click', handleUpdateAvatarFormOpen)

/* EXPORTS */
export {handleCardClick}



