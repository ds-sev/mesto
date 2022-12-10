import {initialCards} from './cards.js';
import {enableValidation, resetErrorMessages} from './validate.js';
import {configValidation} from "./constants.js";
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
const cardTemplate = document.querySelector('#card').content.querySelector('.card'), //доступ к содержимому template для новой карточки
  buttonNewCard = document.querySelector('.profile__button-add'),                             //кнопка добавления новой карточки
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
  placeInput = popupNewCard.querySelector('.edit-form__field_get_place-name'),                  //значения поля ввода названия места
  linkInput = popupNewCard.querySelector('.edit-form__field_get_link');

/* ОТКРЫТИЕ ПОПАПОВ */
function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
  resetErrorMessages(configValidation);                                                                   //сброс ошибок валидации
}

/* ЗАКРЫТИЕ ПОПАПОВ */
function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
}

/* ОТКРЫТИЕ ФОРМЫ РЕДАКТИРОВАНИЯ ПРОФИЛЯ + ПЕРЕНОС ДАННЫХ СО СТРАНИЦЫ В ФОРМУ */
profileEditButton.addEventListener('click', () => {
  nameInput.value = nameOnPage.textContent;
  jobInput.value = jobOnPage.textContent;
  openPopup(profileEditPopup);
  enableValidation(configValidation);
});
/* ОТКРЫТИЕ ФОРМЫ ДОБАВЛЕНИЯ НОВОГО МЕСТА + СБРОС ДАННЫХ ИЗ ПОЛЕЙ */
buttonNewCard.addEventListener('click', () => {
  newCardForm.reset();
  openPopup(popupNewCard);
  enableValidation(configValidation);
});

profilePopupButtonClose.addEventListener('click', () => {
  closePopup(profileEditPopup)
});
cardPopupButtonClose.addEventListener('click', () => {
  closePopup(popupNewCard)
});
imageViewCloseButton.addEventListener('click', () => {
  closePopup(imageViewPopup)
});

/* ОТПРАВКА ДАННЫХ, ПОЛУЧЕННЫХ В ФОРМЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
function handleProfileEditFormSubmitData(evt) {
  evt.preventDefault();
  nameOnPage.textContent = nameInput.value;
  jobOnPage.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

profileEditForm.addEventListener('submit', handleProfileEditFormSubmitData);

/* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ В РАЗМЕТКУ */
const handleSubmitAddCardForm = (event) => {
  event.preventDefault();
  renderCard(cardsSection, {name: placeInput.value, link: linkInput.value});
  closePopup(popupNewCard);
}
newCardForm.addEventListener('submit', handleSubmitAddCardForm);

/* УДАЛЕНИЕ КАРТОЧКИ */
const handleTargetCardDelete = (evt) => {
  evt.target.closest('.card').remove()
}

/* ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ */
const generateCard = (cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector('.card__title');
  const cardLink = cardElement.querySelector('.card__photo-container');
  cardName.textContent = cardData.name;
  cardLink.style.backgroundImage = `url(${cardData.link})`;
  //функция переключения активности Лайков
  const likeButton = cardElement.querySelector('#card__button-like');
  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('card__button-like_active');
  });
  const deleteCardButton = cardElement.querySelector('#card-button-delete');
  deleteCardButton.addEventListener('click', handleTargetCardDelete);
  //просмотр полноэкранного изображения выбранной карточки
  const imageCard = cardElement.querySelector('#image-card');
  imageCard.addEventListener('click', () => {
    imageViewItem.src = cardData.link;
    imageViewTitle.textContent = cardName.textContent;
    imageViewItem.alt = 'На фото: ' + cardName.textContent;
    openPopup(imageViewPopup);
  });
  return cardElement;
}

/* ФУНКЦИЯ ДОБАВЛЕНИЯ КАРТОЧКИ В РАЗМЕТКУ */
const renderCard = (section, cardData) => {
  section.prepend(generateCard(cardData));
}

/* ПЕРЕБОР МАССИВА ПРЕДЗАГРУЖЕННЫХ КАРТОЧКЕК И ПЕРЕДАЧА КАЖДОГО ЭЛЕМЕНТА В ФУНКЦИЮ СОЗДАНИЯ НОВОЙ КАРТОЧКИ */
initialCards.slice().reverse()
  .forEach((initialCardData) => {
    renderCard(cardsSection, initialCardData);
  });

/* ЗАКРЫТИЕ ФОРМЫ КЛИКОМ ПО ОВЕРЛЕЮ */
const popupOverlays = [...document.querySelectorAll('.popup')];
popupOverlays.forEach((overlay) => {
  overlay.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });
});

/* ЗАКРЫТИЕ ФОРМЫ НАЖАТИЕМ ESC */
const closePopupByEscKey = () => {
  document.addEventListener('keydown', (evt) => {
    const popups = [...document.querySelectorAll('.popup')];
    popups.forEach((popupActive) => {
      if (popupActive.classList.contains('popup_opened')) {
        if (evt.code === 'Escape') {
          const popupOpen = document.querySelector('.popup_opened')
          closePopup(popupOpen);
        }
      }
    })
  })
};

closePopupByEscKey();


