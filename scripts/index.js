/* IMPORTS */
import {initialCards} from './initialCards.js';
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

/*** CONST`S ***/

/* ПОЛЯ ПРОФИЛЯ НА СТРАНИЦЕ */
const nameOnPage = document.querySelector('.profile__name');                                 //отображаемое на сайте имя
const jobOnPage = document.querySelector('.profile__about');                                 //отображаемое на сайте занятие
/* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const profileEditButton = document.querySelector('.profile__button-edit'),                   //кнопка редактирования профиля
  profileEditPopup = document.querySelector('#profile-edit-popup'),                          //форма редактирования профиля
  nameInput = document.querySelector('.edit-form__field_get_name'),                          //значения поля имени в форме
  jobInput = document.querySelector('.edit-form__field_get_job'),                            //значение поля ввода занятия в форме
  profilePopupButtonClose = document.querySelector('#profile-edit-form-button-close'),       //кнопка закрытия формы редактирования профиля
  profileEditForm = document.querySelector('#profile-edit-form');
/* ДОБАВЛЕНИЕ МЕСТА */
const buttonNewCard = document.querySelector('.profile__button-add'),                         //кнопка добавления новой карточки
  popupNewCard = document.querySelector('#add-card-popup'),                                   //форма добавления нового места
  cardPopupButtonClose = document.querySelector('#add-card-form-button-close');               //кнопка закрытия формы добавления нового места
/* ПРОСМОТР ИЗОБРАЖЕНИЯ */
const imageViewPopup = document.querySelector('#image-view-popup'),
  imageViewItem = document.querySelector('.image-view__item'),
  imageViewTitle = document.querySelector('.image-view__title'),
  imageViewCloseButton = document.querySelector('#image-view-button-close');
/* ДАННЫЕ КАРТОЧЕК */
const cardsSection = document.querySelector('.cards'),
  newCardForm = popupNewCard.querySelector('#add-card-form'),
  placeInput = popupNewCard.querySelector('.edit-form__field_get_place-name'),                //значения поля ввода названия места
  linkInput = popupNewCard.querySelector('.edit-form__field_get_link');
/* ПОПАПЫ */
const popupList = [...document.querySelectorAll('.popup')];

const cardTemplate = document.querySelector('#card').content.querySelector('.card')

const configValidation = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__field',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'edit-form__field_type_error',
  errorClass: 'edit-form__field_error_active',
}

/*** FUNCTIONS ***/

function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscKey)
}

function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscKey);
}

/* ОТПРАВКА ДАННЫХ, ПОЛУЧЕННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleProfileEditFormSubmitData(evt) {
  evt.preventDefault();
  nameOnPage.textContent = nameInput.value;
  jobOnPage.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

/* ЗАКРЫТИЕ ПОПАПОВ НАЖАТИЕМ НАКРЕСТИК ИЛИ КЛИКОМ ПО ОВЕРЛЕЮ  */
popupList.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('button_type_close')) {
      closePopup(evt.currentTarget);
    }
  })
})

/* ЗАКРЫТИЕ ФОРМЫ НАЖАТИЕМ ESC */
const closePopupByEscKey = (evt) => {
  if (evt.code === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened')
    closePopup(popupOpen);
  }
}

/* ОТКРЫТИЕ ПОЛНОЭКРАННОГО ИЗОБРАЖЕНИЯ */
const handleImageClick = (link, name) => {
  imageViewItem.src = link;
  imageViewTitle.textContent = name;
  imageViewItem.alt = `На фото: ${name}`;
  openPopup(imageViewPopup);
}

/* СОЗДАНИЕ НОВОЙ КАРТОЧКИ */
const handleSubmitAddCardForm = (event) => {
  event.preventDefault();
  renderCard({name: placeInput.value, link: linkInput.value}, cardsSection);
  closePopup(popupNewCard);
}

/* СОЗДАНИЕ КАРТОЧКИ */
const createCard = (cardData, handleImageClick) => {
  return new Card(cardTemplate, cardData, handleImageClick).generateCard()
}
/* ДОБАВЛЕНИЕ КАРТОЧКИ В РАЗМЕТКУ */
const renderCard = (cardData, section) => {
  section.prepend(createCard(cardData,handleImageClick));
}

/* ПЕРЕБОР МАССИВА ПРЕДЗАГРУЖЕННЫХ КАРТОЧКЕК И ОТРИСОВКА В РАЗМЕТКУ */
initialCards.reverse().forEach((initialCardData) => {
  renderCard(initialCardData, cardsSection)
})

/* СОЗДАНИЕ ЭКЗЕМПЛЯРА КЛАССА ВАЛИДАЦИИ ДЛЯ КАЖДОЙ ПРОВЕРЯЕМОЙ ФОРМЫ */
const profileFormValidation = new FormValidator(configValidation, profileEditForm);
profileFormValidation.enableValidation();

const newCardFormValidation = new FormValidator(configValidation, newCardForm);
newCardFormValidation.enableValidation();

/*** EVENT LISTENERS ***/

/* ОТКРЫТИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ + ПЕРЕНОС ДАННЫХ СО СТРАНИЦЫ В ФОРМУ */
profileEditButton.addEventListener('click', () => {
  nameInput.value = nameOnPage.textContent;
  jobInput.value = jobOnPage.textContent;
  profileFormValidation.resetValidation()
  openPopup(profileEditPopup);
})
/* ОТКРЫТИЕ ФОРМЫ ДОБАВЛЕНИЯ НОВОГО МЕСТА + СБРОС ДАННЫХ ИЗ ПОЛЕЙ */
buttonNewCard.addEventListener('click', () => {
  newCardForm.reset();
  newCardFormValidation.resetValidation();
  openPopup(popupNewCard);
})

profileEditForm.addEventListener('submit', handleProfileEditFormSubmitData);
newCardForm.addEventListener('submit', handleSubmitAddCardForm);

/* EXPORTS */
export {handleImageClick}
