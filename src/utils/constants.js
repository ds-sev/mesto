/** ELEMENTS */
export const profileEditButton = document.querySelector('.profile__button-edit'),
  nameInput = document.querySelector('.edit-form__field_get_name'),
  jobInput = document.querySelector('.edit-form__field_get_job'),
  profileEditForm = document.querySelector('#profile-edit-form'),
  buttonNewCard = document.querySelector('.profile__button-add'),
  popupNewCard = document.querySelector('#add-card-popup'),
  newCardForm = popupNewCard.querySelector('#add-card-form')

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
  avatarSelector = '.profile__photo'

/** INITIAL CARDS */
export const initialCards = [
  {
    name: 'Севастополь',
    link: 'https://images.unsplash.com/photo-1598177183267-28a7765536de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Коктебель',
    link: 'https://images.unsplash.com/photo-1644745585878-2617e61fff00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Бахчисарай',
    link: 'https://images.unsplash.com/photo-1598707206160-0a6b20211774?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'
  },
  {
    name: 'Алупка',
    link: 'https://images.unsplash.com/photo-1601204057702-0bf266c98ca9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Белогорск',
    link: 'https://images.unsplash.com/photo-1623527859001-8010a15cf790?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Ялта',
    link: 'https://images.unsplash.com/photo-1624571149875-59a402116d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
  }
]
