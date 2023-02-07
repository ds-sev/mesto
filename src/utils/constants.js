/** ELEMENTS */
export const profileEditButton = document.querySelector('.profile__button-edit'),
  nameInput = document.querySelector('.edit-form__field_get_name'),
  jobInput = document.querySelector('.edit-form__field_get_job'),
  profileEditForm = document.querySelector('#profile-edit-form'),
  buttonNewCard = document.querySelector('.profile__button-add'),
  popupNewCard = document.querySelector('#add-card-popup'),
  newCardForm = popupNewCard.querySelector('#add-card-form'),
  avatarUpdateButton = document.querySelector('.profile__photo-container'),
  avatarUpdateForm = document.querySelector('#update-avatar-form')

/** SELECTORS */
export const configValidation = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'edit-form__field_type_error',
  errorClass: 'edit-form__field_error_active',
}
export const
  cardsSection = '.cards',
  cardTemplateSelector = '#card',
  imagePopupSelector = '.popup-image-view',
  newCardPopupSelector = '.popup-new-card',
  profileEditPopupSelector = '.popup-profile-edit',
  userNameSelector = '.profile__name',
  userAboutSelector = '.profile__about',
  avatarSelector = '.profile__photo',
  confirmationPopupSelector = '.popup-del-card',
  avatarUpdatePopupSelector = '.popup-update-avatar'
