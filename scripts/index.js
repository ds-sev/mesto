import { initialCards } from './cards.js';
/* ПОЛЯ ПРОФИЛЯ НА СТРАНИЦЕ */
const nameOnPage = document.querySelector('.profile__name');                                  //отображаемое на сайте имя
const jobOnPage = document.querySelector('.profile__about');                                  //отображаемое на сайте занятие
/* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const profileEditButton = document.querySelector('.profile__button-edit');                    //кнопка редактирования профиля
const profileEditPopup = document.querySelector('#profile-edit-popup');                       //форма редактирования профиля
const nameInput = document.querySelector('.edit-form__field_get_name');                       //значения поля имени в форме
const jobInput = document.querySelector('.edit-form__field_get_job');                         //значение поля ввода занятия в форме
const profilePopupButtonClose = document.querySelector('#profile-edit-form-button-close');    //кнопка закрытия формы редактирования профиля
const profileEditForm = document.querySelector('#profile-edit-form');
/* ДОБАВЛЕНИЕ МЕСТА */
const cardTemplate = document.querySelector('#card').content.querySelector('.card'); //доступ к содержимому template для новой карточки
const buttonNewCard = document.querySelector('.profile__button-add')                          //кнопка добавления новой карточки
const popupNewCard = document.querySelector('#add-card-popup');                               //форма добавления нового места
const cardPopupButtonClose = document.querySelector('#add-card-form-button-close');           //кнопка закрытия формы добавления нового места

/* ОБРАБОТЧИК СОБЫТИЯ ДЛЯ ОТКРЫТИЯ ПОПАПА РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
const handleProfileEditOpenPopup = function () {
  profileEditPopup.classList.add('popup_opened');
  nameInput.value = nameOnPage.textContent;
  jobInput.value = jobOnPage.textContent;
}

/* ОБРАБОТЧИК СОБЫТИЯ ДЛЯ ОТКРЫТИЯ ПОПАПА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ */
const handleNewCardOpenPopup = function () {
  newCardForm.reset();
  popupNewCard.classList.add('popup_opened');
}

/* ЗАКРЫТИЕ ЦЕЛЕВОГО ПОПАПА */
const handleTargetPopupClose = function () {
  profileEditPopup.classList.remove('popup_opened');
  popupNewCard.classList.remove('popup_opened');
  imageViewPopup.classList.remove('popup_opened');
}

/* ПОЛУЧЕНИE ДАННЫХ ИЗ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleProfileEditFormSubmitData(evt) {
  evt.preventDefault();
  nameOnPage.textContent = nameInput.value;
  jobOnPage.textContent = jobInput.value;
  handleTargetPopupClose();
}

profileEditButton.addEventListener('click', handleProfileEditOpenPopup);
profilePopupButtonClose.addEventListener('click', handleTargetPopupClose);
cardPopupButtonClose.addEventListener('click', handleTargetPopupClose);
buttonNewCard.addEventListener('click', handleNewCardOpenPopup);
profileEditForm.addEventListener('submit', handleProfileEditFormSubmitData);

/* DOM-УЗЛЫ ДЛЯ РАБОТЫ С КАРТОЧКАМИ */
const cardsSection = document.querySelector('.cards');
const newCardForm = popupNewCard.querySelector('#add-card-form');
const placeInput = popupNewCard.querySelector('.edit-form__field_get_place-name');                             //значения поля ввода названия места
const linkInput = popupNewCard.querySelector('.edit-form__field_get_link');                                    //значение поля ввода ссылки на изображение

/* УДАЛЕНИЕ КАРТОЧКИ */
const handleTargetCardDelete = (event) => {
  event.target.closest('.card').remove();
}

const imageViewPopup = document.querySelector('#image-view-popup');
const imageViewItem = document.querySelector('.image-view__item');
const imageViewTitle = document.querySelector('.image-view__title');
const imageViewCloseButton = document.querySelector('#image-view-button-close');
imageViewCloseButton.addEventListener('click', handleTargetPopupClose);

/* ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ */
const generateCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__photo-container');
  cardName.textContent = cardData.name;
  cardLink.style.backgroundImage = `url(${cardData.link})`;
  //функция переключения активности Лайков
  const switchLikeButton = () => {
    const likeButton = cardElement.querySelector('#card__button-like');
    likeButton.addEventListener('click', (event) => {
      event.target.classList.toggle('card__button-like_active');
    })
  }
  switchLikeButton();
  const deleteCardButton = cardElement.querySelector('#card-button-delete');
  //вызов функции удаления карточки
  deleteCardButton.addEventListener('click', handleTargetCardDelete);
  //просмотр полноэкранного изображения выбранной карточки
  const imageCard = cardElement.querySelector('#image-card');
  const handleImageViewPopupOpen = () => {
    imageViewPopup.classList.add('popup_opened');
    imageViewItem.src = cardData.link;
    imageViewTitle.textContent = cardName.textContent;
  }
  imageCard.addEventListener('click', handleImageViewPopupOpen);
  return cardElement;
}

/* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ В РАЗМЕТКУ */
const renderCard = (cardData) => {
  cardsSection.prepend(generateCard(cardData));
}

/* ПЕРЕБОР МАССИВА ПРЕДЗАГРУЖЕННЫХ КАРТОЧКЕК И ПЕРЕДАЧА КАЖДОГО ЭЛЕМЕНТА В ФУНКЦИЮ СОЗДАНИЯ НОВОЙ КАРТОЧКИ */
initialCards.slice().reverse()
  .forEach((cardData) => {
    renderCard(cardData);
  });

/* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ В РАЗМЕТКУ */
const handleSubmitAddCardForm = (event) => {
  event.preventDefault();
  renderCard({name: placeInput.value, link: linkInput.value});
  handleTargetPopupClose();
}
newCardForm.addEventListener('submit', handleSubmitAddCardForm);




